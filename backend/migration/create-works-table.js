const pool = require('../db'); // Assuming you have db.js for MySQL connection

async function createWorksTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS works (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL,
      image VARCHAR(255) NOT NULL,
      video VARCHAR(255) NOT NULL,
      slider_images JSON NULL,
      image_before VARCHAR(255) NULL,
      image_after VARCHAR(255) NULL,
      work_category_id INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (work_category_id) REFERENCES work_categories(id) ON DELETE CASCADE
    );
  `;

  try {
    await pool.query(query);
    console.log('Works table created successfully.');
  } catch (error) {
    console.error('Error creating works table:', error.message);
  } finally {
    pool.end();
  }
}

createWorksTable();
