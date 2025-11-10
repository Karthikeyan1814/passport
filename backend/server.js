// backend/server.js

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');

// Routes
const authRoutes = require('./routes/authRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const verificationRoutes = require('./routes/verification_routes');
const adminRoutes = require('./routes/admin_routes');
const policeRoutes = require('./routes/police_routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Compression Middleware
app.use(helmet());
app.use(compression());

// Body Parsing & CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : ['http://localhost:3000'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());

// Serve uploaded documents
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Register API Routes BEFORE error handling
app.use('/api/auth', authRoutes);                 // 🔐 Auth
app.use('/api/applications', applicationRoutes);  // 🧾 Applications
app.use('/api/verify', verificationRoutes);       // ✅ Verifying Officer
app.use('/api/admin', adminRoutes);               // 🛡️ Admin Panel
app.use('/api/police', policeRoutes);             // 👮 Police Panel

// ❌ 404 Not Found Handler — placed AFTER routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// ❌ General Error Handler
app.use((err, req, res, next) => {
  console.error('💥 Server Error:', err);
  res.status(500).json({ message: 'Something went wrong' });
});

// 📦 Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/passport_automation';

mongoose.connect(MONGODB_URI)
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

mongoose.connection.on('connected', () => {
  console.log('📦 MongoDB is live');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB error:', err);
});

// 🚀 Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
