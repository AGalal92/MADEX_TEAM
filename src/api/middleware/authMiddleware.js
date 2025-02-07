const jwt = require('jsonwebtoken');
const User = require('../models/User');
const path = require('path');
const dotenv = require('dotenv');
// Ensure .env is loaded from root directory
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // const decoded = jwt.verify(token, '6ff4b29191a894526bbb761cff75920d2c223bed1fac624d009c06a5fa144e6d');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
