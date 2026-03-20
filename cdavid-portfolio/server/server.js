const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const IS_VERCEL = process.env.VERCEL === '1' || process.env.VERCEL === 'true';

const DATA_DIR = path.join(__dirname, 'data');
const CONTENT_JSON = path.join(DATA_DIR, 'content.json');
const PORTFOLIO_JSON = path.join(DATA_DIR, 'portfolio.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads', 'portfolio');
const ANGULAR_DIST = path.join(__dirname, '..', 'dist', 'cdavid-portfolio', 'browser');

fs.mkdirSync(DATA_DIR, { recursive: true });
fs.mkdirSync(UPLOADS_DIR, { recursive: true });

if (!fs.existsSync(PORTFOLIO_JSON)) {
  fs.writeFileSync(PORTFOLIO_JSON, JSON.stringify([], null, 2));
}

app.use(cors());
app.use(express.json({ limit: '2mb' }));

function sendUploadFile(req, res, next) {
  const relativePath = req.path.replace(/^\/api\/uploads/, '').replace(/^\/uploads/, '');

  if (!relativePath || relativePath === '/') {
    return next();
  }

  const normalizedPath = path.normalize(relativePath).replace(/^([/\\])+/, '');
  const filePath = path.join(__dirname, 'uploads', normalizedPath);
  const uploadsRoot = path.join(__dirname, 'uploads');

  if (!filePath.startsWith(uploadsRoot) || !fs.existsSync(filePath)) {
    return next();
  }

  return res.sendFile(filePath);
}

app.get('/uploads/{*splat}', sendUploadFile);
app.get('/api/uploads/{*splat}', sendUploadFile);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename: (_req, file, cb) => {
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1e6);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, uniquePrefix + ext);
  }
});

const fileFilter = (_req, file, cb) => {
  const allowed = /\.(png|jpg|jpeg|webp|gif)$/i;
  if (allowed.test(path.extname(file.originalname))) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (png, jpg, jpeg, webp, gif) are allowed'), false);
  }
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 10 * 1024 * 1024 } });

function readJson(filePath, fallback) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch {
    return fallback;
  }
}

function writeJson(filePath, data) {
  if (IS_VERCEL) {
    const err = new Error('Production is read-only on Vercel. Edit locally, commit, and redeploy.');
    err.statusCode = 403;
    throw err;
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

app.get('/api/content', (_req, res) => {
  const data = readJson(CONTENT_JSON, {});
  res.set('Cache-Control', 'no-store');
  res.json(data);
});

app.post('/api/content', (req, res) => {
  try {
    writeJson(CONTENT_JSON, req.body);
    res.json(req.body);
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
});

app.get('/api/portfolio', (_req, res) => {
  const data = readJson(PORTFOLIO_JSON, []);
  res.set('Cache-Control', 'no-store');
  res.json(data);
});

app.post('/api/portfolio', (req, res) => {
  try {
    writeJson(PORTFOLIO_JSON, req.body);
    res.json(req.body);
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
});

app.post('/api/portfolio/upload', upload.single('image'), (req, res) => {
  if (IS_VERCEL) {
    return res.status(403).json({
      error: 'Production is read-only on Vercel. Upload images locally, commit them, and redeploy.'
    });
  }

  if (!req.file) {
    return res.status(400).json({ error: 'No image file provided' });
  }

  const filename = req.file.filename;
  const imagePath = `/uploads/portfolio/${filename}`;
  return res.json({ filename, imagePath });
});

app.delete('/api/portfolio/upload/:filename', (req, res) => {
  if (IS_VERCEL) {
    return res.status(403).json({
      error: 'Production is read-only on Vercel. Delete images locally, commit, and redeploy.'
    });
  }

  const filename = path.basename(req.params.filename);
  const filePath = path.join(UPLOADS_DIR, filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  }

  try {
    fs.unlinkSync(filePath);
    return res.json({ message: 'File deleted', filename });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to delete file', details: err.message });
  }
});

if (!IS_VERCEL) {
  app.use(express.static(ANGULAR_DIST));

  app.get('/{*splat}', (_req, res) => {
    const indexPath = path.join(ANGULAR_DIST, 'index.html');
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send('Angular build not found. Run "npm run build" first.');
    }
  });
}

app.use((err, _req, res, _next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  }
  if (err) {
    return res.status(400).json({ error: err.message });
  }
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT} (API: /api/content, /api/portfolio)`);
  });
}

module.exports = app;
