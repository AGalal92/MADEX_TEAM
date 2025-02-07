const pool = require('../db'); // Assuming your db.js exports the MySQL pool

async function seedServices() {
  const insertQuery = `
    INSERT INTO services (title, icon, image, heading, description, list_items, paragraph)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const services = [
    {
      title: 'Modi sit est dela pireda nest',
      icon: 'bi bi-binoculars',
      image: '/assets/images/working-1.jpg',
      heading: 'Voluptatem dignissimos provident quasi corporis voluptates sit assumenda.',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      list_items: JSON.stringify([
        'Ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        'Duis aute irure dolor in reprehenderit in voluptate velit.',
        'Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate trideta storacalaperda mastiro dolore eu fugiat nulla pariatur.',
      ]),
      paragraph:
        'Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    },
  ];

  try {
    for (const service of services) {
      await pool.query(insertQuery, [
        service.title,
        service.icon,
        service.image,
        service.heading,
        service.description,
        service.list_items,
        service.paragraph,
      ]);
    }
    console.log('Services seeded successfully.');
  } catch (error) {
    console.error('Error seeding services:', error.message);
  } finally {
    pool.end();
  }
}

seedServices();
