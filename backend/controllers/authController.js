const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('Login Request:', { email, password });

    // Trim inputs
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // Check if user exists
    const user = await User.findByEmail(trimmedEmail);
    if (!user) {
      console.log('User not found');
      return res.status(400).json({ message: 'User not found' });
    }

    console.log('User found:', user);

    // Validate password
    const isMatch = await bcrypt.compare(trimmedPassword, user.password);
    console.log('Password Match:', isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token, email: user.email });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { login };