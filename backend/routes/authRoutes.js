const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const SECRET = 'passport_secret_key';

// Register
router.post('/register', async (req, res) => {
  const { name, email, password, role = 'applicant' } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ name, email, password, role });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });
    console.log("🧠 Login success response:", {
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });
    
    
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
