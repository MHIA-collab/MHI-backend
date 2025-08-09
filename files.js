const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const File = require('../models/File');

const UP = process.env.UPLOAD_DIR || 'uploads';
const storage = multer.diskStorage({ destination: UP, filename: (req,file,cb) => cb(null, Date.now() + path.extname(file.originalname)) });
const upload = multer({ storage });

router.post('/', upload.single('file'), async (req, res) => {
  const url = `${req.protocol}://${req.get('host')}/${UP}/${req.file.filename}`;
  const f = await File.create({ name: req.file.originalname, url, size: req.file.size, type: req.file.mimetype });
  res.json(f);
});

router.get('/', async (req,res) => res.json(await File.find()));
module.exports = router;
