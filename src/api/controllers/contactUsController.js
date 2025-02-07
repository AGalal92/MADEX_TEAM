const Contact = require('../models/Contact');

// Get all contact messages
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find(); // Fetch all from MongoDB
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact messages', error: error.message });
  }
};

// Get a single contact message by ID
const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact message not found' });
    }

    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact message', error: error.message });
  }
};

// Create a new contact message
const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const contact = new Contact({ name, email, subject, message });
    await contact.save(); // Save to MongoDB

    res.status(201).json({ message: 'Contact message created successfully!', contact });
  } catch (error) {
    res.status(500).json({ message: 'Error creating contact message', error: error.message });
  }
};

// Delete a contact message
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact message not found' });
    }

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
