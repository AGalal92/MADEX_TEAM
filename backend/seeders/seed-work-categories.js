const pool = require('../db'); // Assuming you have db.js for MySQL connection

async function seedWorkCategories() {
  const query = `
    INSERT INTO work_categories (category, img, title)
    VALUES (?, ?, ?);
  `;

  const categories = [
    { category: 'app', img: '/assets/images/app-1.jpg', title: 'App 1' },
    { category: 'product', img: '/assets/images/product-1.jpg', title: 'Product 1' },
    { category: 'branding', img: '/assets/images/branding-1.jpg', title: 'Branding 1' },
    { category: 'books', img: '/assets/images/books-1.jpg', title: 'Books 1' },
    { category: 'app', img: '/assets/images/app-2.jpg', title: 'App 2' },
    { category: 'product', img: '/assets/images/product-2.jpg', title: 'Product 2' },
    { category: 'branding', img: '/assets/images/branding-2.jpg', title: 'Branding 2' },
    { category: 'books', img: '/assets/images/books-2.jpg', title: 'Books 2' },
    { category: 'app', img: '/assets/images/app-3.jpg', title: 'App 3' },
    { category: 'product', img: '/assets/images/product-3.jpg', title: 'Product 3' },
    { category: 'branding', img: '/assets/images/branding-3.jpg', title: 'Branding 3' },
    { category: 'books', img: '/assets/images/books-3.jpg', title: 'Books 3' },
  ];

  try {
    for (const category of categories) {
      await pool.query(query, [category.category, category.img, category.title]);
    }
    console.log('Work Categories seeded successfully.');
  } catch (error) {
    console.error('Error seeding work categories:', error.message);
  } finally {
    pool.end();
  }
}

seedWorkCategories();

