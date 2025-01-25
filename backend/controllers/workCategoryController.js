const pool = require('../db'); // Assuming you have db.js for MySQL connection
const path = require('path');
const fs = require('fs');

// Get all work categories
const getAllCategories = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM work_categories');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error: error.message });
  }
};

// Get a single work category by ID
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM work_categories WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching category', error: error.message });
  }
};

// Create a new work category
const createCategory = async (req, res) => {
  try {
    const { category, title } = req.body;
    const img = req.file ? req.file.filename : null;

    const query = 'INSERT INTO work_categories (category, img, title) VALUES (?, ?, ?)';
    await pool.query(query, [category, img, title]);

    res.status(201).json({ message: 'Category created successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating category', error: error.message });
  }
};

// Update a work category
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, title } = req.body;
    const img = req.file ? req.file.filename : null;

    // Fetch existing image
    const [rows] = await pool.query('SELECT img FROM work_categories WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Delete old image if a new one is uploaded
    if (img && rows[0].img) {
      const oldImagePath = path.join(__dirname, '../storage', rows[0].img);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    const query = 'UPDATE work_categories SET category = ?, img = ?, title = ? WHERE id = ?';
    await pool.query(query, [category, img || rows[0].img, title, id]);

    res.json({ message: 'Category updated successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating category', error: error.message });
  }
};

// Delete a work category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch existing image
    const [rows] = await pool.query('SELECT img FROM work_categories WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Delete the image file
    if (rows[0].img) {
      const imagePath = path.join(__dirname, '../storage', rows[0].img);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    const query = 'DELETE FROM work_categories WHERE id = ?';
    await pool.query(query, [id]);

    res.json({ message: 'Category deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error: error.message });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
