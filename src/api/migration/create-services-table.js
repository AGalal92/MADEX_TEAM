const mongoose = require('../db'); // MongoDB connection
const Service = require('../models/Service');

const createServicesCollection = async () => {
  try {
    // Sample data to populate the collection
    const services = [
      {
        title: 'Web Development',
        icon: 'bi bi-binoculars',
        heading: 'Professional Web Development',
        description: 'We create stunning websites and web applications.',
        image: '1738105313594-935279978.jpg',
        list_items: ['Responsive Design', 'SEO Optimization', 'Performance'],
        paragraph: 'Our team ensures your website is modern and fast.',
      },
      {
        title: 'Web App Development',
        icon: 'bi bi-binoculars',
        heading: 'Professional App Development',
        description: 'We create stunning websites and web applications.',
        image: '1738105289500-170697844.jpg',
        list_items: ['Responsive Design', 'SEO Optimization', 'Performance'],
        paragraph: 'Our team ensures your website is modern and fast.',
      },
      {
        title: 'Web IOS Development',
        icon: 'bi bi-binoculars',
        heading: 'Professional IOS Development',
        description: 'We create stunning websites and web applications.',
        image: '1738105289500-170697844.jpg',
        list_items: ['Responsive Design', 'SEO Optimization', 'Performance'],
        paragraph: 'Our team ensures your website is modern and fast.',
      },
      {
        title: 'Web Desktop Development',
        icon: 'bi bi-binoculars',
        heading: 'Professional Desktop Development',
        description: 'We create stunning websites and web applications.',
        image: '1738105289500-170697844.jpg',
        list_items: ['Responsive Design', 'SEO Optimization', 'Performance'],
        paragraph: 'Our team ensures your website is modern and fast.',
      },
    ];

    // Insert sample data into the collection
    await Service.insertMany(services);
    console.log('Migration completed: Services collection created and populated.');
  } catch (error) {
    console.error('Error running migration:', error.message);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
};

// Execute the migration
createServicesCollection();
