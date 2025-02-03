# Hardware, Software, and Third Party Services

## Hardware and Software Systems Versions

Neosofia will define hardware/software systems in "mark" versions to walk other organizations through the cost/scale/compliance levels achieved based on the level of investment for each version. The goal is to minimize operational costs while maximizing scale and compliance. We'll start with a single piece of hardware plus key 3rd party services and scale up to a max size "home lab" setup with a half rack of servers drawing no more than 2k watts.

### Services and Software used for all Systems
 * [Proxmox](proxmox.com) (Debian 12) for the operating system to virtualize all employee workstations plus self-hosted [EASs](/shared/glossary.md#EAS).
 * [Cloudflare](https://www.cloudflare.com/) for public DNS resolution and https tunneling to self-hosted services
 * [Cloudflare](https://www.cloudflare.com/) for internal DNS resolution to provide malware protection (1.1.1.3 and 1.0.0.3)
 * [Let's Encrypt](https://letsencrypt.org/) for SSL certificates
 * [GitHub](github.com) for [SCC](/shared/glossary.md#source-code-control) and [CI/CD](/shared/glossary.md#continuous-integration-and-continuous-delivery-cicd)


### Neosofia Mark 1 System (NS-MK1)

Our first version of the self-hosted services will run on a very modest NUC while also leveraging a single internet provider for service hosting.

 * A [Beelink](bee-link.com) EQ12 with N100 processor for self-hosted services
 * [Digi]() provided router for 10G network connectivity
 * Desktop UPS (100 watts max power draw)

> [!NOTE]
> Future blog posts will detail why we've elected to self-host most of our EASs.

### Neosofia Mark 2 System (NS-MK2)

Second physical zone plus introduction of Minisforum MS-A2 and UniFi Cloud Gateway Ultra (200w per zone)

### Neosofia Mark 3 System (NS-MK3)

Second region plus introduction of NAS, HA cluster, 2k UPS, and Dream Machine Pro Max (1000w for main zone)

### Neosofia Mark 4 System (NS-MK4)

Maximizing the performance and compliance of half rack "home lab" system with a max power draw of 2,000 watts.