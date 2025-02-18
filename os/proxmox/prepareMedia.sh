#!/usr/bin/env bash

# Load environment variables through a .env file
set -a; source .env; set +a

set -euo pipefail

export WAN_DEVICE="${WAN_DEVICE:=enp1s0}"
export LAN_DEVICE="${LAN_DEVICE:=enp2s0}"

export WAN_IP="${WAN_IP:=192.168.1.217/24}"
export WAN_GW="${WAN_GW:=192.168.1.1}"

# !!!!!! WARNING !!!!!!!!
# Running this script then rebooting into the the PVE INSTALL device will nuke
# everything from all of the devices below except the PBS backup device.
# 
# Assumed device layout
# NVME for PVE to be installed on
# SATA (sda) spinning metal drive for PBS
# USB stick (sdb) for host level backups using REAR
# USB stick (sdc) for PVE install media (last resort if REAR is corrupted)

export PVE_INSTALL_TO_DEVICE="${INSTALL_DEVICE_ID:=nvme0n1}"
export PBS_BACKUP_DEVICE="${PBS_BACKUP_DEVICE:=sda}"
export REAR_BACKUP_DEVICE="${REAR_BACKUP_DEVICE:=sdb}"


# TBD: Add check for OS
apt install proxmox-auto-install-assistant -y

# Grab the current iso and don't clobber if you've already got it
wget -nc https://enterprise.proxmox.com/iso/proxmox-ve_8.3-1.iso


# Build the toml file
# TBD: Add more env vars with "smart" defaults
cat << EOF > answer.toml
[global]
keyboard = "en-us"
country = "us"
fqdn = "pve0001.local"
mailto = "server@pve0001.local"
timezone = "UTC"
root_password = "${ROOT_PW}"

[network]
source = "from-answer"
cidr = "${WAN_IP}"
dns = "1.1.1.1"
gateway = "${WAN_GW}"
filter.INTERFACE = "${WAN_DEVICE}"

[disk-setup]
filesystem = "ext4"
disk_list = ["${PVE_INSTALL_TO_DEVICE}"]

[first-boot]
source = "from-iso"
ordering = "fully-up"
EOF


# Setup first boot script
cat pveSetup.sh | envsubst > firstBoot.sh
cat networkingSetup.sh | envsubst >> firstBoot.sh
cat rearSetup.sh | envsubst >> firstBoot.sh

echo "reboot" >> firstBoot.sh

chmod 775 firstBoot.sh

proxmox-auto-install-assistant prepare-iso proxmox-ve_8.3-1.iso \
    --fetch-from iso \
    --answer-file answer.toml \
    --on-first-boot firstBoot.sh

dd bs=1M conv=fdatasync if=./proxmox-ve_8.3-1-auto-from-iso.iso of=/dev/${PVE_INSTALL_FROM_DEVICE}


