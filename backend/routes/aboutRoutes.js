const express = require('express');
const upload = require('../middleware/upload');
const {
  createAbout,
  updateAbout,
  deleteAbout,
  getAllAbouts,
  getAboutById,
} = require('../controllers/aboutController');

const router = express.Router();

// Routes
router.get('/', getAllAbouts);
router.get('/:id', getAboutById);
router.post('/', upload.fields([{ name: 'img1' }, { name: 'img2' }]), createAbout);
router.put('/:id', upload.fields([{ name: 'img1' }, { name: 'img2' }]), updateAbout);
router.delete('/:id', deleteAbout);

module.exports = router;
