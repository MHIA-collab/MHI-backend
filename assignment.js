const mongoose = require('mongoose');
const assignment = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  title: String,
  dueDate: Date,
  attachments: [{ name: String, url: String }],
  grades: [{ student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, grade: Number }]
}, { timestamps: true });
module.exports = mongoose.model('Assignment', assignment);
