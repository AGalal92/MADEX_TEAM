const pool = require('../db'); // Assuming your db.js exports the MySQL pool

async function createContactUsTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS contact_us (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      subject VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log('Contact Us table created successfully.');
  } catch (error) {
    console.error('Error creating Contact Us table:', error.message);
  } finally {
    pool.end();
  }
}

createContactUsTable();
