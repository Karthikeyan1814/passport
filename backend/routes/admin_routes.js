const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Application = require('../models/Application');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');

// GET /api/applications - Get all applications (Admin only)
router.get('/applications', auth, isAdmin, async (req, res) => {
  try {
    const applications = await Application.find().populate('user');
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /admin-verify/:id → Update application to "Admin Verified"
router.put('/admin-verify/:id', auth, isAdmin, async (req, res) => {
  console.log('Verifying application ID:', req.params.id);
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    application.status = 'Admin Verified'; // ✅ Fixed here
    await application.save();

    res.json({ message: 'Application verified successfully' });
  } catch (err) {
    console.error('Verification Error:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});

// PUT /issue-passport/:id → Issue passport
router.put('/issue-passport/:id', auth, isAdmin, async (req, res) => {
  try {
    const app = await Application.findById(req.params.id);
    if (!app) return res.status(404).json({ message: 'Application not found' });

    if (app.status !== 'Admin Verified') {
      return res.status(400).json({ message: 'Application must be Admin Verified before issuing passport' });
    }

    app.status = 'Passport Issued';
    app.passportIssuedAt = new Date();
    app.message = 'Your passport is verified successfully';
    await app.save();

    res.json({ message: 'Passport issued and user notified' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
