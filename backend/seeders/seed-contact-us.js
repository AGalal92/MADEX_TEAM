const pool = require('../db'); // Assuming your db.js exports the MySQL pool

async function seedContactUs() {
  const insertQuery = `
    INSERT INTO contact_us (name, email, subject, message)
    VALUES (?, ?, ?, ?)
  `;

  const contacts = [
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      subject: 'General Inquiry',
      message: 'I have a question about your services.',
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      subject: 'Support Request',
      message: 'I need help with my account.',
    },
  ];

  try {
    for (const contact of contacts) {
      await pool.query(insertQuery, [contact.name, contact.email, contact.subject, contact.message]);
    }
    console.log('Contact Us data seeded successfully.');
  } catch (error) {
    console.error('Error seeding Contact Us data:', error.message);
  } finally {
    pool.end();
  }
}

seedContactUs();
