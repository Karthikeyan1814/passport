const express = require('express');
const router = express.Router();
const Application = require('../models/Application');

// GET all applications for verification
router.get('/', async (req, res) => {
  try {
    const apps = await Application.find();

    const parsedApps = apps.map(app => ({
      _id: app._id,
      name: app.fullName,
      dob: app.dob,
      address: app.address,
      verification: app.verification,
      status: app.status,
    }));

    res.json(parsedApps);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT: Update officer verification status
router.put('/:id', async (req, res) => {
  try {
    const { status, officerName, officerNotes } = req.body;

    // Determine application status based on officer decision
    let newStatus = 'Pending';
    if (status === 'Verified') {
      newStatus = 'Verified';
    } else if (status === 'Rejected') {
      newStatus = 'Rejected';
    }

    const updatedApp = await Application.findByIdAndUpdate(
      req.params.id,
      {
        'verification.officerVerified': status,
        'verification.officerNotes': officerNotes || '',
        'verification.officer': officerName || 'Verifying Officer',
        'verification.officerVerifiedAt': new Date(),
        status: newStatus,
      },
      { new: true }
    );

    res.json(updatedApp);
  } catch (err) {
    console.error('Update failed:', err);
    res.status(500).json({ error: 'Update failed' });
  }
});

module.exports = router;
