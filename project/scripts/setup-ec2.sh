#!/bin/bash

# Update system packages
apt update && apt upgrade -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Add global npm packages to PATH
export PATH="$PATH:/usr/local/bin"
echo "export PATH=\"\$PATH:/usr/local/bin\"" >> /etc/profile
echo "export PATH=\"\$PATH:/usr/local/bin\"" >> /home/ubuntu/.bashrc

# Install PM2 globally with explicit path
sudo env "PATH=$PATH" npm install -g pm2

# Install Git
apt install -y git

# Install Nginx
apt install -y nginx

# Create app directory and set permissions
mkdir -p /var/www/my-legendary-app
chown -R ubuntu:ubuntu /var/www/my-legendary-app

# Switch to app directory
cd /var/www/my-legendary-app

# Remove existing files if directory is not empty
if [ "$(ls -A /var/www/my-legendary-app)" ]; then
    rm -rf /var/www/my-legendary-app/*
fi

# Clone the repository (you'll need to replace with your repo URL)
git clone https://github.com/yourusername/my-legendary-app.git .

# Create package-lock.json if it doesn't exist
if [ ! -f "package-lock.json" ]; then
    npm install --package-lock-only
fi

# Install dependencies and build
npm ci
npm run build

# Copy Nginx configuration
cp nginx.conf /etc/nginx/sites-available/my-legendary-app

# Enable site and remove default
ln -sf /etc/nginx/sites-available/my-legendary-app /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Configure PM2 with explicit path
sudo -E env "PATH=$PATH" pm2 start ecosystem.config.cjs
sudo -E env "PATH=$PATH" pm2 save
sudo -E env "PATH=$PATH" pm2 startup

# Configure firewall
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

# Test Nginx configuration
nginx -t

# Restart Nginx
systemctl restart nginx

echo "EC2 setup completed!"