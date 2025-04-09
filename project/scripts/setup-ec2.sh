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

# Create app directory if it doesn't exist
mkdir -p /var/www/my-legendary-app
chown -R ubuntu:ubuntu /var/www/my-legendary-app

# Switch to app directory
cd /var/www/my-legendary-app

# Skip git clone if package.json exists (meaning files are already there)
if [ ! -f "package.json" ]; then
    echo "No existing application found, cloning repository..."
    # Remove existing files if directory is not empty
    if [ "$(ls -A /var/www/my-legendary-app)" ]; then
        rm -rf /var/www/my-legendary-app/*
    fi
    git clone https://github.com/yourusername/my-legendary-app.git .
else
    echo "Existing application found, skipping clone..."
fi

# Create package-lock.json if it doesn't exist
if [ ! -f "package-lock.json" ]; then
    npm install --package-lock-only
fi

# Install dependencies and build
npm ci
npm run build

# Configure Nginx
cat > /etc/nginx/sites-available/my-legendary-app << 'EOF'
server {
    listen 80;
    server_name _;
    root /var/www/my-legendary-app/dist;
    index index.html;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";
    add_header Referrer-Policy "strict-origin-when-cross-origin";

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 10240;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/x-javascript application/xml application/json;
    gzip_disable "MSIE [1-6]\.";

    # API requests
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Static files
    location / {
        try_files $uri $uri/ /index.html;
        expires -1;
        add_header Cache-Control "no-store, no-cache, must-revalidate";
    }

    # Error pages
    error_page 404 /index.html;
    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }
}
EOF

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
