const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
  id: String, // human-friendly id like C101
  title: String,
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  credits: Number,
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });
module.exports = mongoose.model('Course', courseSchema);
