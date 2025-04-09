module.exports = {
  apps: [{
    name: 'my-legendary-app',
    script: 'server/index.js',
    instances: 1,
    exec_mode: 'fork',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      HOST: '0.0.0.0',
      APP_ROOT: process.cwd()
    }
  }]
};