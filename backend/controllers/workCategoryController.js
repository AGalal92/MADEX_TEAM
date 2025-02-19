const fs = require('fs'); // Import the file system module
const path = require('path'); // Import the path module
const pool = require('../db'); // Assuming you have db.js for MySQL connection

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

    const query = 'INSERT INTO work_categories (category, title) VALUES (?, ?)';
    await pool.query(query, [category, title]);

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

    const [rows] = await pool.query('SELECT * FROM work_categories WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const query = 'UPDATE work_categories SET category = ?, title = ? WHERE id = ?';
    await pool.query(query, [category, title, id]);

    res.json({ message: 'Category updated successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating category', error: error.message });
  }
};

// Delete a work category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query('SELECT * FROM work_categories WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Category not found' });
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
