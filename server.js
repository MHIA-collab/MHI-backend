// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static(path.join(__dirname, process.env.UPLOAD_DIR || 'uploads')));

// connect
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// simple route
app.get('/', (req, res) => res.send({ ok: true, msg: 'MHI Hub API running' }));

// mount routes (see routes folder below)
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const announcementRoutes = require('./routes/announcements');
const assignmentRoutes = require('./routes/assignments');
const userRoutes = require('./routes/users');
const fileRoutes = require('./routes/files');

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/files', fileRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
