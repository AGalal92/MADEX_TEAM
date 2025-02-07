const WorkCategory = require('../models/WorkCategory');

// Get all work categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await WorkCategory.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error: error.message });
  }
};

// Get a single work category by ID
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await WorkCategory.findById(id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching category', error: error.message });
  }
};

// Create a new work category
const createCategory = async (req, res) => {
  try {
    const { category, title } = req.body;

    const newCategory = new WorkCategory({ category, title });
    await newCategory.save();

    res.status(201).json({ message: 'Category created successfully!', newCategory });
  } catch (error) {
    res.status(500).json({ message: 'Error creating category', error: error.message });
  }
};

// Update a work category
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedCategory = await WorkCategory.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json({ message: 'Category updated successfully!', updatedCategory });
  } catch (error) {
    res.status(500).json({ message: 'Error updating category', error: error.message });
  }
};

// Delete a work category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await WorkCategory.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

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
