const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ['applicant', 'verifying_officer', 'admin', 'police'],
    default: 'applicant',
  },
});

module.exports = mongoose.model('User', userSchema);
