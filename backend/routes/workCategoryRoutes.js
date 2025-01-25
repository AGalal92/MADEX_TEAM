const express = require('express');
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/workCategoryController');
const upload = require('../middleware/upload');

const router = express.Router();

// Routes
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.post('/', upload.single('img'), createCategory); // Handle file upload
router.put('/:id', upload.single('img'), updateCategory); // Handle file upload
router.delete('/:id', deleteCategory);

module.exports = router;
