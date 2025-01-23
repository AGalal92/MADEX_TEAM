const pool = require('../db'); // Assuming you have db.js for MySQL connection

async function seedWorkCategories() {
  const query = `
    INSERT INTO work_categories (name, slug)
    VALUES (?, ?)
  `;

  const categories = [
    { name: 'Web Development', slug: 'web-development' },
    { name: 'Graphic Design', slug: 'graphic-design' },
    { name: 'Digital Marketing', slug: 'digital-marketing' },
  ];

  try {
    for (const category of categories) {
      await pool.query(query, [category.name, category.slug]);
    }
    console.log('Work Categories seeded successfully.');
  } catch (error) {
    console.error('Error seeding work categories:', error.message);
  } finally {
    pool.end();
  }
}

seedWorkCategories();
