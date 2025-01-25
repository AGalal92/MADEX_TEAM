const pool = require('../db'); // Assuming your db.js exports the MySQL pool

async function seedTeam() {
  const insertQuery = `
    INSERT INTO team (image, name, position, social_links)
    VALUES (?, ?, ?, ?)
  `;

  const teamMembers = [
    {
      image: '/assets/images/team-1.jpg',
      name: 'Walter White',
      position: 'Chief Executive Officer',
      social_links: JSON.stringify([
        { icon: 'bi bi-twitter', url: '#' },
        { icon: 'bi bi-facebook', url: '#' },
        { icon: 'bi bi-instagram', url: '#' },
        { icon: 'bi bi-linkedin', url: '#' },
      ]),
    },
    {
      image: '/assets/images/team-2.jpg',
      name: 'Jesse Pinkman',
      position: 'Marketing Head',
      social_links: JSON.stringify([
        { icon: 'bi bi-twitter', url: '#' },
        { icon: 'bi bi-facebook', url: '#' },
        { icon: 'bi bi-instagram', url: '#' },
        { icon: 'bi bi-linkedin', url: '#' },
      ]),
    },
  ];

  try {
    for (const member of teamMembers) {
      await pool.query(insertQuery, [member.image, member.name, member.position, member.social_links]);
    }
    console.log('Team members seeded successfully.');
  } catch (error) {
    console.error('Error seeding team members:', error.message);
  } finally {
    pool.end();
  }
}

seedTeam();
