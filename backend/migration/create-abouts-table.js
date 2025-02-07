const mongoose = require('../db'); // Import your MongoDB connection
const About = require('../models/About'); // Import the About model

const createAboutsCollection = async () => {
  try {
    // Sample data to populate the collection
    const abouts = [
      {
        title: 'About Us',
        slug1: 'about-us',
        slug2: 'our-story',
        par1: 'We are a team dedicated to excellence.',
        par2: 'Our story began in 2020, and we have been growing since.',
        link: 'https://example.com/about-us',
        list_items: ['Integrity', 'Innovation', 'Commitment'],
        img1: null,
        img2: null,
      },
    ];

    // Insert sample data into the collection
    await About.insertMany(abouts);
    console.log('Migration completed: Abouts collection created and populated.');
  } catch (error) {
    console.error('Error running migration:', error.message);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
};

// Execute the migration
createAboutsCollection();
