const pool = require('../db'); // Assuming your db.js exports the MySQL pool
async function createWorkCategoriesTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS work_categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(query);
    console.log('Work Categories table created successfully.');
  } catch (error) {
    console.error('Error creating work categories table:', error.message);
  } finally {
    pool.end();
  }
}

createWorkCategoriesTable();
