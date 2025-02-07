const express = require('express');
const {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
} = require('../controllers/contactUsController');

const router = express.Router();

router.get('/', getAllContacts); // Get all contact messages
router.get('/:id', getContactById); // Get a specific contact message
router.post('/', createContact); // Create a new contact message
router.delete('/:id', deleteContact); // Delete a specific contact message

module.exports = router;
