const pool = require('../db'); // Assuming your db.js exports the MySQL pool

async function seedAboutsTable() {
  const insertQuery = `
    INSERT INTO abouts (title, img1, img2, slug1, slug2, par1, par2, link)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);
  `;

  const abouts = [
    {
      title: 'About Us',
      img1: 'about-image1.jpg',
      img2: 'about-image2.jpg',
      slug1: 'about-section-one',
      slug2: 'about-section-two',
      par1: 'This is the first paragraph about us.',
      par2: 'This is the second paragraph about us.',
      link: 'https://example.com/about',
    },
    {
      title: 'Our Mission',
      img1: null,
      img2: null,
      slug1: 'mission-section-one',
      slug2: 'mission-section-two',
      par1: 'This is the first paragraph about our mission.',
      par2: 'This is the second paragraph about our mission.',
      link: 'https://example.com/mission',
    },
  ];

  try {
    for (const about of abouts) {
      const { title, img1, img2, slug1, slug2, par1, par2, link } = about;
      await pool.query(insertQuery, [title, img1, img2, slug1, slug2, par1, par2, link]);
    }
    console.log('Abouts table seeded successfully.');
  } catch (error) {
    console.error('Error seeding abouts table:', error.message);
  } finally {
    pool.end();
  }
}

seedAboutsTable();
