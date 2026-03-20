const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Paths
const DATA_DIR = path.join(__dirname, 'data');
const PORTFOLIO_JSON = path.join(DATA_DIR, 'portfolio.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads', 'portfolio');
const ANGULAR_DIST = path.join(__dirname, '..', 'dist', 'cdavid-portfolio', 'browser');

// Ensure directories exist
fs.mkdirSync(DATA_DIR, { recursive: true });
fs.mkdirSync(UPLOADS_DIR, { recursive: true });

// Initialize portfolio.json if it doesn't exist
if (!fs.existsSync(PORTFOLIO_JSON)) {
  fs.writeFileSync(PORTFOLIO_JSON, JSON.stringify([], null, 2));
}

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded images as static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer config — only accept image files
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

// ── API Routes ──────────────────────────────────────────────────

// GET /api/portfolio — return portfolio data
app.get('/api/portfolio', (_req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(PORTFOLIO_JSON, 'utf-8'));
    res.json(data);
  } catch {
    res.json([]);
  }
});

// POST /api/portfolio — save portfolio data
app.post('/api/portfolio', (req, res) => {
  try {
    const data = req.body;
    fs.writeFileSync(PORTFOLIO_JSON, JSON.stringify(data, null, 2));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save portfolio data', details: err.message });
  }
});

// POST /api/portfolio/upload — upload an image
app.post('/api/portfolio/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file provided' });
  }
  const filename = req.file.filename;
  const imagePath = `/uploads/portfolio/${filename}`;
  res.json({ filename, imagePath });
});

// DELETE /api/portfolio/upload/:filename — delete an image
app.delete('/api/portfolio/upload/:filename', (req, res) => {
  const filename = path.basename(req.params.filename); // sanitize
  const filePath = path.join(UPLOADS_DIR, filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  }

  try {
    fs.unlinkSync(filePath);
    res.json({ message: 'File deleted', filename });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete file', details: err.message });
  }
});

// ── Serve Angular app ──────────────────────────────────────────

app.use(express.static(ANGULAR_DIST));

// SPA fallback — serve index.html for all non-API, non-upload routes
app.get('/{*splat}', (_req, res) => {
  const indexPath = path.join(ANGULAR_DIST, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Angular build not found. Run "npm run build" first.');
  }
});

// Error handler for multer
app.use((err, _req, res, _next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  }
  if (err) {
    return res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
