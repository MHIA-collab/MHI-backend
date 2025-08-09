const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashed = await bcrypt.hash(password || 'password', 10);
  try {
    const u = await User.create({ name, email, password: hashed, role });
    res.json({ ok: true, user: u });
  } catch (e) { res.status(400).json({ ok: false, error: e.message }); }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const u = await User.findOne({ email });
  if (!u) return res.status(401).json({ ok: false, error: 'Invalid' });
  const match = await bcrypt.compare(password, u.password);
  if (!match) return res.status(401).json({ ok: false, error: 'Invalid' });
  const token = jwt.sign({ id: u._id, role: u.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
  res.json({ ok: true, token, user: { id: u._id, name: u.name, email: u.email, role: u.role } });
});

module.exports = router;
