
echo "vnets"
cat <<EOF >/etc/pve/sdn/vnets.cfg
vnet: pvehosts
        zone default

vnet: corpserv
        zone default

vnet: corpapps
        zone default

vnet: lanhosts
        zone default
EOF

echo "subnets setup"
cat <<EOF >/etc/pve/sdn/subnets.cfg
subnet: default-10.10.128.0-17
        vnet corpapps
        dhcp-range start-address=10.10.128.20,end-address=10.10.254.253
        dnszoneprefix corpapps
        gateway 10.10.128.1
        snat 1

subnet: default-10.10.10.0-21
        vnet corpserv
        dhcp-range start-address=10.10.10.20,end-address=10.10.15.253
        dnszoneprefix corpserv
        gateway 10.10.10.1
        snat 1

subnet: default-10.10.64.0-18
        vnet lanhosts
        dhcp-range start-address=10.10.64.20,end-address=10.10.127.253
        gateway 10.10.64.1
        snat 1

subnet: default-10.10.1.0-21
        vnet pvehosts
        dhcp-range start-address=10.10.1.20,end-address=10.10.5.253
        gateway 10.10.1.1
        snat 1
EOF

echo "interfaces setup"
# TBD: This is a hack to get the lanhosts SDN hooked up to our second ethernet port (enp2s0)
cat << EOF > /etc/pve/sdn/pve-ipam-state.json
{"zones":{"default":{"subnets":{"10.10.1.0/21":{"ips":{}},"10.10.128.0/17":{"ips":{}},"10.10.10.0/21":{"ips":{}},"10.10.64.0/18":{"ips":{}}}}}}
EOF
