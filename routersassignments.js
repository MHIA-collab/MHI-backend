const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');
router.get('/', async (req, res) => res.json(await Assignment.find().populate('course')));
router.post('/', async (req, res) => {
  const a = await Assignment.create(req.body);
  res.json(a);
});
router.put('/:id/grade', async (req, res) => {
  const { studentId, grade } = req.body;
  const a = await Assignment.findById(req.params.id);
  a.grades = a.grades || [];
  const existing = a.grades.find(g => g.student.toString() === studentId);
  if (existing) existing.grade = grade; else a.grades.push({ student: studentId, grade });
  await a.save();
  res.json(a);
});
module.exports = router;
