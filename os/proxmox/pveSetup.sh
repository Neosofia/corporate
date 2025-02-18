#!/usr/bin/env bash

export TERM=xterm

set -euo pipefail

# Point to main Debian Repos
echo "Updating Proxmox VE Sources"
cat <<QED >/etc/apt/sources.list
deb http://deb.debian.org/debian bookworm main contrib
deb http://deb.debian.org/debian bookworm-updates main contrib
deb http://security.debian.org/debian-security bookworm-security main contrib
QED
echo 'APT::Get::Update::SourceListWarnings::NonFreeFirmware "false";' >/etc/apt/apt.conf.d/no-bookworm-firmware.conf

if [[ -z "${PVE_KEY}" ]]; then
  # Disable enterprise repo
  echo "Disabling 'pve-enterprise' repository"
  cat <<QED >/etc/apt/sources.list.d/pve-enterprise.list
# deb https://enterprise.proxmox.com/debian/pve bookworm pve-enterprise
QED

  echo "Enabling 'pve-no-subscription' repository"
  cat <<QED >/etc/apt/sources.list.d/pve-install-repo.list
deb http://download.proxmox.com/debian/pve bookworm pve-no-subscription
QED

  # Fix ceph repos
  echo "Updating 'ceph package repositories'"
  cat <<QED >/etc/apt/sources.list.d/ceph.list
# deb https://enterprise.proxmox.com/debian/ceph-quincy bookworm enterprise
# deb http://download.proxmox.com/debian/ceph-quincy bookworm no-subscription
# deb https://enterprise.proxmox.com/debian/ceph-reef bookworm enterprise
# deb http://download.proxmox.com/debian/ceph-reef bookworm no-subscription
QED

  # Add test repo
  echo "Adding 'pvetest' repository and set disabled"
  cat <<QED >/etc/apt/sources.list.d/pvetest-for-beta.list
# deb http://download.proxmox.com/debian/pve bookworm pvetest
QED

  # Get rid of nag
  echo "Disabling subscription nag"
  echo "DPkg::Post-Invoke { \"dpkg -V proxmox-widget-toolkit | grep -q '/proxmoxlib\.js$'; if [ \$? -eq 1 ]; then { echo 'Removing subscription nag from UI...'; sed -i '/.*data\.status.*{/{s/\!//;s/active/NoMoreNagging/}' /usr/share/javascript/proxmox-widget-toolkit/proxmoxlib.js; }; fi\"; };" >/etc/apt/apt.conf.d/no-nag-script
  apt --reinstall install proxmox-widget-toolkit &>/dev/null
  echo "Disabled subscription nag (Delete browser cache)"
else
  pvesubscription set ${PVE_KEY}
  pvesubscription update -force
  pvesubscription get
fi

# Grab latests packages
# TBD: Restrict updates to pins?
echo "Starting apt-get updates"
apt-get update
apt-get -y dist-upgrade



# EAR Setup using Clevis and LUKS
# TBD: Do we still need clevis for systemd-cryptenroll?
apt-get install clevis clevis-tpm2 clevis-luks -y

# Use the commented commands below to cleanup the disk and start over
#
# !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
# !!! WARNING: these commands are hardcoded to /dev/sda and will wipe the disk
# !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
#
# cryptsetup close secbackups
# echo "YES" | cryptsetup erase /dev/sda1
# wipefs -a /dev/sda
# echo 'type=83' | sfdisk /dev/sda 

cryptsetup luksFormat /dev/${PBS_BACKUP_DEVICE} <<< ${EAR_PASSPHRASE}
cryptsetup open /dev/${PBS_BACKUP_DEVICE} secbackups <<< ${EAR_PASSPHRASE}
mkfs.ext4 /dev/mapper/secbackups 
systemd-cryptenroll --tpm2-device=auto --tpm2-pcrs=7 /dev/${PBS_BACKUP_DEVICE} <<< ${EAR_PASSPHRASE}

export PBS_BACKUP_UUID=`blkid -s UUID -o value /dev/${PBS_BACKUP_DEVICE}`

cat <<QED > /etc/crypttab
secbackups /dev/disk/by-uuid/${PBS_BACKUP_UUID} none tpm2-device=auto" >> /etc/crypttab'
QED

update-initramfs -u

# Now mount the LUKS device (secbackups) and add it to Proxmox VE for backups and ISOs
echo "setting up PBS backups and ISOs mount point"
mkdir /mnt/backups
cat <<QED >> /etc/fstab
/dev/mapper/secbackups /mnt/backups ext4 rw,relatime 0 0 
QED
systemctl daemon-reload
mount /mnt/backups

pvesm add dir backups \
        --path /mnt/backups \
        --is_mountpoint yes \
        --content backup,iso

