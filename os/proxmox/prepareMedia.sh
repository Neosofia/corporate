#!/usr/bin/env bash

# Load environment variables through a .env file
set -a; source .env; set +a

set -euo pipefail

WAN_DEVICE="${WAN_DEVICE:=enp1s0}"
LAN_DEVICE="${LAN_DEVICE:=enp2s0}"

WAN_IP="${WAN_IP:=192.168.1.217/24}"
WAN_GW="${WAN_GW:=192.168.1.1}"

INSTALL_DEVICE_ID="${INSTALL_DEVICE_ID:=nvme0n1}"
BACKUP_DEVICE_ID="${BACKUP_DEVICE_UUID:=sda}"
USB_STICK_ID="${USB_STICK_ID:=sdb}"


# TBD: Add check for OS
apt install proxmox-auto-install-assistant -y

# Grab the current iso and don't clobber if you've already got it
wget -nc https://enterprise.proxmox.com/iso/proxmox-ve_8.3-1.iso


# Build the toml file
# TBD: More work needed here to support a wider variety of hardware 
# and network layouts 
cat << EOF > answer.toml
[global]
keyboard = "en-us"
country = "us"
fqdn = "pve0001.local"
mailto = "server@neosofia.tech"
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
disk_list = ["${INSTALL_DEVICE_ID}"]

[first-boot]
source = "from-iso"
ordering = "fully-up"
EOF





proxmox-auto-install-assistant prepare-iso proxmox-ve_8.3-1.iso \
    --fetch-from iso \
    --answer-file answer.toml \
    --on-first-boot firstBoot.sh

dd bs=1M conv=fdatasync if=./proxmox-ve_8.3-1-auto-from-iso.iso of=/dev/${USB_STICK_ID}


