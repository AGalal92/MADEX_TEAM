const mongoose = require('../db'); // MongoDB connection
const Work = require('../models/Work');
const WorkCategory = require('../models/WorkCategory');

const createWorksCollection = async () => {
  try {
    // Find a work category to associate with the works
    const category = await WorkCategory.findOne();

    if (!category) {
      console.error('No WorkCategory found! Please migrate work categories first.');
      return;
    }

    // Sample data to populate the collection
    const works = [
      {
        title: 'E-Commerce Website',
        slug: 'e-commerce-site',
        image: '1738016033058-313370259.jpg',
        video: '1738016033062-281510229.mp4',
        slider_images: [
          "1738103203510-661972205.jpg",
          "1738103203518-647889982.jpg",
          "1738103262481-950477362.jpg",
          "1738103262484-103788531.jpg"
      ],
        image_before: '1738273798379-648384270.jpg',
        image_after: '1738016439157-377629544.jpg',
        work_category_id: category._id, // Use an existing WorkCategory ID
      },
      {
        title: 'Mobile Banking App',
        slug: 'mobile-banking-app',
        image: '1738016438553-93852231.jpg',
        video: '1738016033062-281510229.mp4',
        slider_images: [
          "1738020653382-20161314.jpg",
          "1738105377824-417581301.jpg"
      ],
        image_before: '1738016033609-520284607.jpg',
        image_after: '1738016033613-151226392.jpg',
        work_category_id: category._id,
      },
    ];

    // Insert sample data into the collection
    await Work.insertMany(works);
    console.log('Migration completed: Works collection created and populated.');
  } catch (error) {
    console.error('Error running migration:', error.message);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
};

// Execute the migration
createWorksCollection();
