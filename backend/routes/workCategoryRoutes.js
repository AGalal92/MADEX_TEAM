const express = require('express');
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/workCategoryController');
const { upload, compressFiles } = require('../middleware/upload'); // Import both

const router = express.Router();

// Routes
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.post('/', upload.single('img'),compressFiles, createCategory); // Handle file upload
router.put('/:id', upload.single('img'),compressFiles, updateCategory); // Handle file upload
router.delete('/:id', deleteCategory);

module.exports = router;
