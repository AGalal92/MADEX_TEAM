const path = require('path');

// Import all seeders
const seedAbouts = require('./seed-abouts');
const seedContactUs = require('./seed-contact-us');
const seedServices = require('./seed-services');
const seedTeam = require('./seed-team');
const seedUsers = require('./seed-users');
const seedWorkCategories = require('./seed-work-categories');
const seedWorks = require('./seed-works');

// Execute all seeders sequentially
const runSeeders = async () => {
  try {
    console.log('Starting seeding process...');
    await seedAbouts();
    console.log('Seeded: Abouts');

    await seedContactUs();
    console.log('Seeded: Contact Us');

    await seedServices();
    console.log('Seeded: Services');

    await seedTeam();
    console.log('Seeded: Team');

    await seedUsers();
    console.log('Seeded: Users');

    await seedWorkCategories();
    console.log('Seeded: Work Categories');

    await seedWorks();
    console.log('Seeded: Works');

    console.log('Seeding process completed successfully!');
  } catch (error) {
    console.error('Error during seeding:', error.message);
  }
};

runSeeders();
