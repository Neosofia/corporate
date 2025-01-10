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


# Setup spinning metal drive for PBS and ISOs
echo "setting up PBS backups and ISOs mount point"
mkdir /mnt/backups
cat <<QED >> /etc/fstab
/dev/${PBS_BACKUP_DEVICE} /mnt/backups ext4 rw,relatime 0 0 
QED
systemctl daemon-reload
mount /mnt/backups

pvesm add dir backups \
        --path /mnt/backups \
        --is_mountpoint yes \
        --content backup,iso

