const pool = require('../db'); // Assuming your db.js exports the MySQL pool

async function createTeamTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS team (
      id INT AUTO_INCREMENT PRIMARY KEY,
      image VARCHAR(255) NULL,
      name VARCHAR(255) NOT NULL,
      position VARCHAR(255) NOT NULL,
      social_links JSON NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log('Team table created successfully.');
  } catch (error) {
    console.error('Error creating team table:', error.message);
  } finally {
    pool.end();
  }
}

createTeamTable();
