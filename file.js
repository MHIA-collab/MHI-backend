const mongoose = require('mongoose');
const f = new mongoose.Schema({ name: String, url: String, size: Number, type: String, uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } }, { timestamps: true });
module.exports = mongoose.model('File', f);
