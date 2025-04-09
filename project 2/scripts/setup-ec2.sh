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

# Create app directory with proper permissions
sudo mkdir -p /var/www/my-legendary-app
sudo chown -R ubuntu:ubuntu /var/www/my-legendary-app
sudo chmod 755 /var/www/my-legendary-app

# Switch to app directory
cd /var/www/my-legendary-app || {
    echo "Failed to change to application directory"
    exit 1
}

# Clone and setup the repository
echo "Setting up application..."
# Remove existing files if directory is not empty
rm -rf /var/www/my-legendary-app/*

# Clone the repository
git clone https://github.com/Daravathsaiteja/duskv1.git . || {
    echo "Failed to clone repository"
    exit 1
}

# Copy project files to the correct location
if [ -d "project" ]; then
    cp -r project/* .
    cp -r project/.* . 2>/dev/null || true
    rm -rf project
fi

# Verify package.json exists
if [ ! -f "package.json" ]; then
    echo "Error: package.json not found!"
    exit 1
fi

# Install dependencies
echo "Installing dependencies..."
npm install --package-lock-only
npm ci

# Build the application
echo "Building application..."
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

# Set correct permissions
chown -R ubuntu:ubuntu /var/www/my-legendary-app
chmod -R 755 /var/www/my-legendary-app

# Start the application with PM2
echo "Starting application..."
sudo -E env "PATH=$PATH" pm2 start ecosystem.config.cjs
sudo -E env "PATH=$PATH" pm2 save
sudo -E env "PATH=$PATH" pm2 startup

# Configure firewall
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

# Test Nginx configuration
nginx -t || {
    echo "Nginx configuration test failed"
    exit 1
}

# Restart Nginx
systemctl restart nginx

echo "EC2 setup completed!"