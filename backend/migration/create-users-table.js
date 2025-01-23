const pool = require('../db'); // Assuming you have db.js for MySQL connection

async function createUsersTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role ENUM('admin', 'user', 'guest') DEFAULT 'user',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(query);
    console.log('Users table created successfully.');
  } catch (error) {
    console.error('Error creating users table:', error.message);
  } finally {
    pool.end();
  }
}

createUsersTable();
