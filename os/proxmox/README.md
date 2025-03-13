<!--- Referenced Glossary Terms -->
[ear]: /website/qms/glossary.md#encryption-at-rest-ear


<!--- External Links -->
[rear]: https://relax-and-recover.org/
[od]: https://github.com/abraunegg/onedrive
[pve]: https://www.proxmox.com/en/
[pvesetup]: https://www.proxmox.com/en/proxmox-virtual-environment/get-started
[pvehs]: https://community-scripts.github.io/ProxmoxVE/scripts?id=post-pve-install
[sdn]: https://pve.proxmox.com/pve-docs/chapter-pvesdn.html

# Proxmox Setup

In order to run corporate services and applications, Neosofia has elected to use Proxmox for virtualization. To support our compliance by design objective, the following procedures are followed in order to create the system that will automatically back up and restore the entire operating system on a daily basis. These scripts also support our [policies](/website/qms/policies.md) by setting up:
 * Encryption at Rest ([EAR][ear]) for the [PVE][pve] backup device
 * [REAR][rear] setup for automated host level backup and recovery
 * Tools need to move backups to an offsite location ([OneDrive][od])
 * [SDN][sdn] for network partitioning

## Prerequisites/Assumptions

Before starting this process, you will need the following:
 * A piece of hardware with two physical NICs, and three storage mediums. The three devices should be an NVME, SATA disk, and USB stick.
 * An EFI bootloader and is set to your boot drive (nvme)
 * Proxmox installed on the target hardware (8.3-1 as of this writing)
 * An internet connection hooked to the WAN port.

> [!NOTE] 
> This guide used a Beelink EQ system with dual 2.5GB ports, N100 processor, 512GB nvme, 1TB 2.5" SATA drive, and 64GB USB 3.0 pen drive. The NVME device is set as the first device to boot from as making the USB device first would cause an infinite reinstall loop :s


## OS Setup

In order to bootstrap our system, an existing Proxmox installation must be used to create your first USB stick. Standard Proxmox installation instructions can be found [here][pvesetup] and if you don't have a subscription, you must also run the Proxmox post install helper scripts [here][pvehs]. Once the machine is booted we must set up environment variables to be used by the [prepareMedia.sh](prepareMedia.sh) script by copying the [env.sample](.env.sample) to `.env` and modifying to suit our hardware. Below are the defaults used in the current setup scripts.

> [!WARNING]
> Based on how you configure your environment variables, the unattended install process will **wipe out all devices** without any prompting!

| Variable              | Command to Lookup     | Default Value    | Notes |
|-----------------------|-----------------------|------------------| ----- |
| WAN_DEVICE            | `ip -br -c addr show` | enp1s0           |       |
| LAN_DEVICE            | `ip -br -c addr show` | enp2s0           |       |
| WAN_IP                | `hostname -I`         | 192.168.1.217/24 | You need to manually add the subnet to the end of the line. `/24` in our case |
| WAN_GW                | `ip route`            | 192.168.1.1      |       |
| PVE_INSTALL_TO_DEVICE | `lsblk -fs`           | nvme0n1          |       |
| PBS_BACKUP_DEVICE     | `lsblk -fs `          | sda              | This is where backups and ISOs will be stored to support the rebuild process. |
| REAR_BACKUP_DEVICE    | `lsblk -fs`           | sdb              | Where REAR will be installed to back up and restore to/from for our proxmox host. |

Once your `.env` file is set up, run the [prepareMedia.sh](prepareMedia.sh) command to generate the answers file and burn the ISO catered to your system. As the machine will not boot into the USB device you can use the command below to force a reboot into the USB stick.

> [!CAUTION]
> FINAL WARNING: Based on how you configured your environment variables, the unattended install process will **wipe out all devices** without any prompting!

To find your USB stick with the Proxmox installer use the command `efibootmgr` and once identified run this command to reboot into the USB stick (000B in our case) `efibootmgr -n 000B && systemctl reboot`

After about five minutes the machine will boot into Proxmox for the first time and a second reboot will occur once packages are updated. If any errors occurred you can navigate to the pve0001 > System > System Log or if you only have terminal access use the `journalctl` command.

## Future

These instructions are based on a single machine setup. In the future, we will expand these instructions to include 
 * Setting up a 3-5 node HA cluster
 * Rolling rebuilds for a single node in a HA cluster in a single region
 * Managing multiple clusters across multiple geographic regions
