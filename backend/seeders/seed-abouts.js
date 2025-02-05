const pool = require('../db'); // Assuming your db.js exports the MySQL pool

async function seedAboutsTable() {
  const insertQuery = `
    INSERT INTO abouts (title, img1, img2, slug1, slug2, par1, par2, link,list_items)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  const abouts = [
    {
      title: 'About Us',
      img1: '/assets/images/about-image1.jpg',
      img2: '/assets/images/about-image2.jpg',
      slug1: 'about-section-one',
      slug2: 'about-section-two',
      par1: 'This is the first paragraph about us.',
      par2: 'This is the second paragraph about us.',
      link: 'https://example.com/about',
      list_items: JSON.stringify([
        'Ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        'Duis aute irure dolor in reprehenderit in voluptate velit.',
        'Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate trideta storacalaperda mastiro dolore eu fugiat nulla pariatur.',
      ]),
    },
  ];

  try {
    for (const about of abouts) {
      const { title, img1, img2, slug1, slug2, par1, par2, link, list_items } = about;
      await pool.query(insertQuery, [title, img1, img2, slug1, slug2, par1, par2, link, list_items]);
    }
    console.log('Abouts table seeded successfully.');
  } catch (error) {
    console.error('Error seeding abouts table:', error.message);
  } finally {
    pool.end();
  }
}

seedAboutsTable();
module.exports = seedAboutsTable;