const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SECRET = 'passport_secret_key';

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = user;
    next();
  } catch (err) {
    console.error('Auth error:', err.message);
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;
