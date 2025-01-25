const pool = require('../db'); // Assuming your db.js exports the MySQL pool

async function createServicesTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS services (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      icon VARCHAR(255) NOT NULL,
      image VARCHAR(255) NULL,
      heading VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      list_items JSON NOT NULL,
      paragraph TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `;

  try {
    const [result] = await pool.query(createTableQuery);
    console.log('Services table created successfully:', result);
  } catch (error) {
    console.error('Error creating services table:', error.message);
  } finally {
    pool.end();
  }
}

createServicesTable();
