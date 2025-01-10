#!/usr/bin/env bash

export TERM=xterm

set -euo pipefail

# Leaving this blank for now as Proxmox does not currently support automated host rebuilds.
# As your server ID changes between each rebuild, the key is bound to the first build and
# can't programmatically be revoked and reapplied more than three times.
export PVE_KEY=

# Point to main Debian Repos
echo "Updating Proxmox VE Sources"
cat <<EOF >/etc/apt/sources.list
deb http://deb.debian.org/debian bookworm main contrib
deb http://deb.debian.org/debian bookworm-updates main contrib
deb http://security.debian.org/debian-security bookworm-security main contrib
EOF
echo 'APT::Get::Update::SourceListWarnings::NonFreeFirmware "false";' >/etc/apt/apt.conf.d/no-bookworm-firmware.conf



if [[ -z "${PVE_KEY}" ]]; then
  # Disable enterprise repo
  echo "Disabling 'pve-enterprise' repository"
  cat <<EOF >/etc/apt/sources.list.d/pve-enterprise.list
# deb https://enterprise.proxmox.com/debian/pve bookworm pve-enterprise
EOF

  echo "Enabling 'pve-no-subscription' repository"
  cat <<EOF >/etc/apt/sources.list.d/pve-install-repo.list
deb http://download.proxmox.com/debian/pve bookworm pve-no-subscription
EOF

  # Fix ceph repos
  echo "Updating 'ceph package repositories'"
  cat <<EOF >/etc/apt/sources.list.d/ceph.list
# deb https://enterprise.proxmox.com/debian/ceph-quincy bookworm enterprise
# deb http://download.proxmox.com/debian/ceph-quincy bookworm no-subscription
# deb https://enterprise.proxmox.com/debian/ceph-reef bookworm enterprise
# deb http://download.proxmox.com/debian/ceph-reef bookworm no-subscription
EOF

  # Add test repo
  echo "Adding 'pvetest' repository and set disabled"
  cat <<EOF >/etc/apt/sources.list.d/pvetest-for-beta.list
# deb http://download.proxmox.com/debian/pve bookworm pvetest
EOF

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

# Setup for basic DHCP services
apt-get -y install dnsmasq
systemctl disable --now dnsmasq

# Setup "basic" SDN
echo "setting up networking"
cat <<EOF >/etc/pve/sdn/zones.cfg
simple: default
        dhcp dnsmasq
        ipam pve
EOF

pvesh set /cluster/sdn

# NOTE: This assumes you have a sata device on /dev/sda
# Remount backup disk use lsblk -fs to find your backup device
echo "setting up backups mount point"
mkdir /mnt/backups
cat <<EOF >> /etc/fstab
/dev/sda1 /mnt/backups ext4 rw,relatime 0 0 
EOF
systemctl daemon-reload
mount /mnt/backups

pvesm add dir backups \
        --path /mnt/backups \
        --is_mountpoint yes \
        --content backup,iso

cp /mnt/backups/config.db /var/lib/pve-cluster/config.db


# Setup our host-level backup and restoration solution
echo "Setting up REAR"

apt-get install rear -y

cat <<EOF >> /etc/rear/local.conf
USB_DEVICE_FILESYSTEM=ext4

OUTPUT=USB

BACKUP=NETFS
BACKUP_URL=usb:///dev/disk/by-label/REAR-000

GRUB2_DEFAULT_BOOT="rear_secure_boot"
GRUB2_TIMEOUT=5
KERNEL_CMDLINE="unattended"

USER_INPUT_TIMEOUT=3
EOF

# Format the disk and make our first baseline backup
echo Yes | rear format /dev/sdb 
rear mkrescue
rear mkbackup


# Setup the backup and restore cronjob






# Always reboot after apt-get updates
# TBD force reboot into nvme device?
echo "rebooting after apt-get updates"
reboot