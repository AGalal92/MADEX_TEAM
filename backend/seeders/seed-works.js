const pool = require('../db'); // Assuming you have db.js for MySQL connection

async function seedWorks() {
  const query = `
    INSERT INTO works (title, slug, image, video, slider_images, work_category_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const works = [
    {
      title: 'Portfolio Website',
      slug: 'portfolio-website',
      image: 'portfolio.jpg',
      video: 'portfolio.mp4',
      slider_images: JSON.stringify(['image1.jpg', 'image2.jpg', 'image3.jpg']),
      work_category_id: 1, // Replace with a valid work_category_id
    },
    {
      title: 'E-commerce App',
      slug: 'ecommerce-app',
      image: 'ecommerce.jpg',
      video: 'ecommerce.mp4',
      slider_images: JSON.stringify(['product1.jpg', 'product2.jpg', 'product3.jpg']),
      work_category_id: 2, // Replace with a valid work_category_id
    },
  ];

  try {
    for (const work of works) {
      await pool.query(query, [
        work.title,
        work.slug,
        work.image,
        work.video,
        work.slider_images,
        work.work_category_id,
      ]);
    }
    console.log('Works seeded successfully.');
  } catch (error) {
    console.error('Error seeding works:', error.message);
  } finally {
    pool.end();
  }
}

seedWorks();
