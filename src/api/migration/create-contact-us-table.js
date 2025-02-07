const mongoose = require('../db'); // MongoDB connection
const Contact = require('../models/Contact'); // Contact model

const createContactCollection = async () => {
  try {
    // Sample data to populate the collection
    const contacts = [
      {
        name: 'John Doe',
        email: 'johndoe@example.com',
        subject: 'Inquiry about services',
        message: 'I would like to know more about your offerings.',
      },
      {
        name: 'Jane Smith',
        email: 'janesmith@example.com',
        subject: 'Support Request',
        message: 'I need assistance with my account.',
      },
    ];

    // Insert sample data into the collection
    await Contact.insertMany(contacts);
    console.log('Migration completed: Contact Us collection created and populated.');
  } catch (error) {
    console.error('Error running migration:', error.message);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
};

// Execute the migration
createContactCollection();
