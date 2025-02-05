const pool = require('../db'); // Assuming your db.js exports the MySQL pool

async function createAboutsTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS abouts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) DEFAULT '',
      img1 VARCHAR(255) NULL,
      img2 VARCHAR(255) NULL,
      slug1 VARCHAR(255) DEFAULT '',
      slug2 VARCHAR(255) DEFAULT '',
      par1 TEXT NULL,
      par2 TEXT NULL,
      list_items JSON NOT NULL,
      link VARCHAR(255) NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `;

  try {
    const [result] = await pool.query(createTableQuery);
    console.log('Abouts table created successfully:', result);
  } catch (error) {
    console.error('Error creating abouts table:', error.message);
  } finally {
    pool.end();
  }
}

createAboutsTable();
