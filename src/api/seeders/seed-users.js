const bcrypt = require('bcryptjs');
const pool = require('../db'); // Assuming you have db.js for MySQL connection

async function seedUsers() {
  const query = `
    INSERT INTO users (name, email, password, role)
    VALUES (?, ?, ?, ?)
  `;

  const password = await bcrypt.hash('Admin@123', 10); // Hash the password

  const users = [
    { name: 'Admin User', email: 'admin@admin.com', password, role: 'admin' },
    { name: 'Regular User', email: 'user@user.com', password, role: 'user' },
  ];

  try {
    for (const user of users) {
      await pool.query(query, [user.name, user.email, user.password, user.role]);
    }
    console.log('Users seeded successfully.');
  } catch (error) {
    console.error('Error seeding users:', error.message);
  } finally {
    pool.end();
  }
}

seedUsers();
