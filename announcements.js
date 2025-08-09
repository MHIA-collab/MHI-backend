const express = require('express');
const router = express.Router();
const Ann = require('../models/Announcement');
router.get('/', async (req, res) => res.json(await Ann.find().populate('author')));
router.post('/', async (req, res) => res.json(await Ann.create({ ...req.body, date: new Date() })));
router.delete('/:id', async (req, res) => { await Ann.findByIdAndDelete(req.params.id); res.json({ ok: true }); });
module.exports = router;
