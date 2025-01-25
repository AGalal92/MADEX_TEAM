const pool = require('../db'); // Assuming db.js exports the MySQL pool

// Get all contact messages
const getAllContacts = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM contact_us');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact messages', error: error.message });
  }
};

// Get a single contact message by ID
const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM contact_us WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Contact message not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact message', error: error.message });
  }
};

// Create a new contact message
const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const query = `
      INSERT INTO contact_us (name, email, subject, message)
      VALUES (?, ?, ?, ?)
    `;
    await pool.query(query, [name, email, subject, message]);

    res.status(201).json({ message: 'Contact message created successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating contact message', error: error.message });
  }
};

// Delete a contact message
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query('DELETE FROM contact_us WHERE id = ?', [id]);

    res.json({ message: 'Contact message deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact message', error: error.message });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
};
