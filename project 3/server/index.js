import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const APP_ROOT = process.env.APP_ROOT || process.cwd();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(compression());
app.use(express.json());

// Configure Helmet with necessary CSP for React
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const distPath = join(APP_ROOT, 'dist');
  console.log('Serving static files from:', distPath);
  app.use(express.static(distPath));
}

// API routes go here
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Serve index.html for all other routes in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    const indexPath = join(APP_ROOT, 'dist', 'index.html');
    console.log('Serving index.html from:', indexPath);
    res.sendFile(indexPath);
  });
}

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, HOST, () => {
  console.log(`Server running on ${HOST}:${PORT} in ${process.env.NODE_ENV} mode`);
  console.log('App root directory:', APP_ROOT);
});
