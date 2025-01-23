const mysql = require('mysql2/promise'); // Import mysql2
const bcrypt = require('bcryptjs'); // Import bcryptjs
const dotenv = require('dotenv');

dotenv.config();

const seedUser = async () => {
  try {
    // Create a connection to the database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // Define the initial user data
    const plainPassword = 'Admin@12345';
    const hashedPassword = await bcrypt.hash(plainPassword, 10); // Hash the password

    const user = {
      name: 'Admin',
      email: 'admin@admin.com',
      password: hashedPassword,
    };

    // Insert the user into the database
    const [result] = await connection.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [user.name, user.email, user.password]
    );

    console.log('User seeded successfully:', result);

    // Close the database connection
    await connection.end();
  } catch (err) {
    console.error('Error seeding user:', err);
  }
};

// Run the seeder
seedUser();