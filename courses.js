const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

router.get('/', async (req, res) => { const list = await Course.find().populate('instructor students'); res.json(list); });
router.post('/', async (req, res) => { const c = await Course.create(req.body); res.json(c); });
router.get('/:id', async (req, res) => { const c = await Course.findById(req.params.id).populate('instructor students'); res.json(c); });
router.put('/:id', async (req, res) => { const c = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json(c); });
router.delete('/:id', async (req, res) => { await Course.findByIdAndDelete(req.params.id); res.json({ ok: true }); });

module.exports = router;
