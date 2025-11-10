// backend/routes/police_routes.js

const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const auth = require('../middleware/auth');

// Middleware: Ensure police access only
const isPolice = (req, res, next) => {
  if (req.user.role !== 'police') {
    return res.status(403).json({ message: 'Access denied: Police only' });
  }
  next();
};

// ✅ GET: Fetch all applications needing police verification
router.get('/pending', auth, isPolice, async (req, res) => {
  try {
    const pendingApps = await Application.find({ status: 'Verified' }); // Assumption: After verification, police step
    res.json(pendingApps);
  } catch (err) {
    console.error('Error fetching police apps:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// ✅ PUT: Police verify application
router.put('/verify/:id', auth, isPolice, async (req, res) => {
  const { notes, verified } = req.body;

  try {
    const app = await Application.findById(req.params.id);
    if (!app) return res.status(404).json({ message: 'Application not found' });

    app.verification = {
      ...app.verification,
      policeVerified: verified ? 'Verified' : 'Rejected',
      policeNotes: notes,
      policeVerifiedAt: new Date(),
      policeOfficer: req.user.email
    };

    // Optionally update status
    if (verified) {
      app.status = 'Police Verified';
    } else {
      app.status = 'Rejected';
    }

    await app.save();
    res.json({ message: 'Police verification updated successfully' });
  } catch (err) {
    console.error('Error verifying application by police:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// ✅ GET: Get application status
router.get('/status/:id', auth, isPolice, async (req, res) => {
  try {
    const app = await Application.findById(req.params.id);
    if (!app) return res.status(404).json({ message: 'Not found' });
    res.json({ status: app.status, verification: app.verification });
  } catch (err) {
    console.error('Error checking status:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
