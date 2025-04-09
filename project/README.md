# North Dusk E-Commerce

A full-stack e-commerce application built with React, Express, and Tailwind CSS.

## Development Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with required environment variables
4. Start the development server:
   ```bash
   npm run dev
   ```

## Production Deployment (AWS EC2)

1. Launch an EC2 instance (Ubuntu 22.04 LTS recommended)

2. Connect to your EC2 instance:
   ```bash
   ssh -i your-key.pem ubuntu@your-ec2-ip
   ```

3. Clone the repository to `/var/www/north-dusk`

4. Run the setup script:
   ```bash
   chmod +x scripts/setup-ec2.sh
   ./scripts/setup-ec2.sh
   ```

5. Install dependencies and build:
   ```bash
   npm install
   npm run build
   ```

6. Start the application:
   ```bash
   pm2 start ecosystem.config.cjs
   ```

7. Save the PM2 process list:
   ```bash
   pm2 save
   ```

8. Setup PM2 to start on system boot:
   ```bash
   pm2 startup
   ```

## Environment Variables

Create a `.env` file with the following variables:

```
PORT=3000
NODE_ENV=production
```

## Features

- Full-stack application with Express backend
- React frontend with Tailwind CSS
- PM2 process manager for production
- Nginx reverse proxy
- Automatic startup on system reboot
- Security headers with Helmet
- API request logging with Morgan
- GZIP compression
- CORS enabled
- Production-ready configuration