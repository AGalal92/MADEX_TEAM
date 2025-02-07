const mongoose = require('../db'); // MongoDB connection
const Team = require('../models/Team');

const createTeamCollection = async () => {
  try {
    // Define social links in the required format
    const socialLinks = [
      { url: '#', icon: 'bi bi-twitter' },
      { url: '#', icon: 'bi bi-facebook' },
      { url: '#', icon: 'bi bi-instagram' },
      { url: '#', icon: 'bi bi-linkedin' },
    ];
    // Sample data to populate the collection
    const teamMembers = [
      {
        name: 'John Doe',
        position: 'CEO',
        social_links: socialLinks,
        image: '1738104828209-533279226.jpg',
      },
      {
        name: 'Jane Smith',
        position: 'CTO',
        social_links: socialLinks,
        image: '1738104866419-832523741.jpg',
      },
      {
        name: 'Jane Smith',
        position: 'CTO',
        social_links: socialLinks,
        image: '1738104860240-223686937.jpg',
      },
      {
        name: 'Jane Smith',
        position: 'CTO',
        social_links: socialLinks,
        image: '1738104844389-512085305.jpg',
      },
    ];

    // Insert sample data into the collection
    await Team.insertMany(teamMembers);
    console.log('Migration completed: Team collection created and populated.');
  } catch (error) {
    console.error('Error running migration:', error.message);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
};

// Execute the migration
createTeamCollection();
