// backend/routes/applicationRoutes.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Application = require('../models/Application');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// 📂 Multer setup for document upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`);
  },
});
const upload = multer({ storage });

// ✅ GET /api/applications → fetch logged-in applicant's applications
router.get('/', auth, async (req, res) => {
  try {
    const query = req.user.role === 'applicant' ? { user: req.user.id } : {};
    const applications = await Application.find(query).populate('user', 'email');
    res.json(applications);
  } catch (err) {
    console.error('Error fetching applications:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ POST /api/applications/apply → submit application
router.post('/apply', auth, upload.single('document'), async (req, res) => {
  try {
    console.log('Incoming Application Data:', req.body); // 👈 check this

    const { fullName, dob, address } = req.body;

    if (!fullName || !dob || !address || !req.file) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newApp = new Application({
      user: req.user._id,
      fullName,
      dob,
      address,
      documents: req.file.filename,
    });

    await newApp.save();
    res.status(201).json({ message: 'Application submitted' });
  } catch (err) {
    console.error('❌ Application creation error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
