const mongoose = require('../db'); // MongoDB connection
const WorkCategory = require('../models/WorkCategory');

const createWorkCategoriesCollection = async () => {
  try {
    // Sample data to populate the collection
    const workCategories = [
      { category: 'Web Development', title: 'Frontend & Backend Development' },
      { category: 'Mobile Development', title: 'iOS & Android Applications' },
      { category: 'Graphic Design', title: 'Creative Design & Branding' },
    ];

    // Insert sample data into the collection
    await WorkCategory.insertMany(workCategories);
    console.log('Migration completed: Work Categories collection created and populated.');
  } catch (error) {
    console.error('Error running migration:', error.message);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
};

// Execute the migration
createWorkCategoriesCollection();
