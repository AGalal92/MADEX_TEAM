const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
// Ensure .env is loaded from root directory
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

mongoose
  // .connect(process.env.MONGODB_URI) // Removed deprecated options
  .connect(process.env.MONGO_URI) // Removed deprecated options
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

module.exports = mongoose;
