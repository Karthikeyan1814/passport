const mongoose = require('mongoose');

const verificationSchema = new mongoose.Schema({
  application: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application',
    required: true,
  },

  officer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  remarks: {
    type: String,
    default: '',
  },

  verifiedBy: {
    type: String,
    enum: ['verifying_officer', 'police'],
    required: true,
  },

  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  }
}, { timestamps: true });

module.exports = mongoose.model('Verification', verificationSchema);
