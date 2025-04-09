#!/bin/bash

# Update system packages
apt update && apt upgrade -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Install PM2 globally
npm install -g pm2

# Install Nginx
apt install -y nginx

# Install Git
apt install -y git

# Configure Nginx
cat > /etc/nginx/sites-available/my-legendary-app << 'EOF'
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# Enable site and remove default
ln -sf /etc/nginx/sites-available/my-legendary-app /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Create app directory and set permissions
mkdir -p /var/www/my-legendary-app
chown -R ubuntu:ubuntu /var/www/my-legendary-app

# Clone the repository (you'll need to replace with your repo URL)
cd /var/www/my-legendary-app
git clone https://github.com/yourusername/my-legendary-app.git .

# Install dependencies and build
npm ci
npm run build

# Configure PM2
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup

# Configure firewall
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

# Restart Nginx
systemctl restart nginx

echo "EC2 setup completed!"