const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // hashed
  role: { type: String, enum: ['admin','instructor','student'], default: 'student' }
}, { timestamps: true });
module.exports = mongoose.model('User', userSchema);
