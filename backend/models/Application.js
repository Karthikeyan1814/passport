const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  documents: {
    type: String,
    required: true,
  },
  verification: {
    officerVerified: {
      type: String,
      enum: ['Verified', 'Rejected', 'Pending'],
      default: 'Pending',
    },
    officerNotes: String,
    officerVerifiedAt: Date,
    officer: String,
    policeVerified: {
      type: String,
      enum: ['Verified', 'Rejected', 'Pending'],
      default: 'Pending',
    },
    policeNotes: String,
    policeVerifiedAt: Date,
    policeOfficer: String,
  },
  status: {
    type: String,
    enum: [
      'Pending',
      'Verified',
      'Rejected',
      'Police Verified',
      'Admin Verified',  // ✅ Added this
      'Passport Issued',
    ],
    default: 'Pending',
  },
  passportIssuedAt: Date,
  message: String,
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
