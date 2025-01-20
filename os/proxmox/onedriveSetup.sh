echo "Installing OneDrive"
apt-get install onedrive -y


echo "Configuring OneDrive"

cat << EOF > /root/.config/onedrive/config
sync_dir = "/mnt/backups"
EOF

echo "Authorizing OneDrive (TBD)"
# TBD: Need to do something like
# curl <some url to get token>
# onedrive --resync-auth --reauth --auth-response <token URL from curl commands above>

echo "Starting OneDrive"
systemctl --user enable onedrive
systemctl --user start onedrive


# Monitoring OneDrive
# systemctl --user status onedrive.service
# journalctl --user-unit=onedrive.service -f