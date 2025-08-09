const express = require('express');
const router = express.Router();
const User = require('../models/User');
router.get('/', async (req, res) => res.json(await User.find()));
router.post('/', async (req, res) => res.json(await User.create(req.body)));
router.delete('/:id', async (req, res) => { await User.findByIdAndDelete(req.params.id); res.json({ ok: true }); });
module.exports = router;
