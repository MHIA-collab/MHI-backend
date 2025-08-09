const mongoose = require('mongoose');
const ann = new mongoose.Schema({ title: String, body: String, author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, date: Date }, { timestamps: true });
module.exports = mongoose.model('Announcement', ann);
