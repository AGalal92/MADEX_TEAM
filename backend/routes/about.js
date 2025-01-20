const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/aboutController');

// Get "about" data for a specific ID
router.get('/', aboutController.getAbout);

// Update "about" data for a specific ID
router.put('/:id', aboutController.updateAbout);

// Delete a field in "about" data for a specific ID
router.delete('/:id/:field', aboutController.deleteField);

// Reset "about" data for a specific ID
router.post('/:id/reset', aboutController.resetAbout);

module.exports = router;
