const mongoose = require('../db'); // MongoDB connection
const User = require('../models/User');

const seedUser = async () => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: 'admin@admin.com' });
    if (existingUser) {
      console.log('Admin user already exists.');
      return;
    }

    // Create an admin user
    const user = new User({
      name: 'Admin',
      email: 'admin@admin.com',
      password: 'Admin@12345', // Password will be hashed automatically in the model
    });

    await user.save();
    console.log('Admin user seeded successfully.');
  } catch (err) {
    console.error('Error seeding user:', err);
  } finally {
    mongoose.connection.close();
  }
};

// Run the seeder
seedUser();
