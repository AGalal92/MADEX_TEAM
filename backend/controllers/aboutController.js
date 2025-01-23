const pool = require('../db'); // Assuming db.js exports the MySQL pool
const path = require('path');
const fs = require('fs');

// Function to create a new about
const createAbout = async (req, res) => {
  try {
    const { title, slug1, slug2, par1, par2, link } = req.body;

    const img1 = req.files?.img1 ? req.files.img1[0].filename : null;
    const img2 = req.files?.img2 ? req.files.img2[0].filename : null;

    const query = `
      INSERT INTO abouts (title, img1, img2, slug1, slug2, par1, par2, link)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await pool.query(query, [title, img1, img2, slug1, slug2, par1, par2, link]);

    res.status(201).json({ message: 'About created successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating about', error: error.message });
  }
};

// Function to update an about
const updateAbout = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, slug1, slug2, par1, par2, link } = req.body;

    const img1 = req.files?.img1 ? req.files.img1[0].filename : null;
    const img2 = req.files?.img2 ? req.files.img2[0].filename : null;

    const updateFields = [
      title,
      img1,
      img2,
      slug1,
      slug2,
      par1,
      par2,
      link,
      id,
    ];

    const query = `
      UPDATE abouts
      SET title = ?, img1 = ?, img2 = ?, slug1 = ?, slug2 = ?, par1 = ?, par2 = ?, link = ?
      WHERE id = ?
    `;
    await pool.query(query, updateFields);

    res.json({ message: 'About updated successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating about', error: error.message });
  }
};

// Function to delete an about
const deleteAbout = async (req, res) => {
  try {
    const { id } = req.params;

    // Get images to delete them from the storage folder
    const [rows] = await pool.query('SELECT img1, img2 FROM abouts WHERE id = ?', [id]);

    if (rows.length > 0) {
      const { img1, img2 } = rows[0];

      if (img1) fs.unlinkSync(path.join(__dirname, '../storage', img1));
      if (img2) fs.unlinkSync(path.join(__dirname, '../storage', img2));
    }

    await pool.query('DELETE FROM abouts WHERE id = ?', [id]);

    res.json({ message: 'About deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting about', error: error.message });
  }
};

// Function to get all abouts
const getAllAbouts = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM abouts');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching abouts', error: error.message });
  }
};

// Function to get a single about by ID
const getAboutById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM abouts WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'About not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching about', error: error.message });
  }
};

module.exports = {
  createAbout,
  updateAbout,
  deleteAbout,
  getAllAbouts,
  getAboutById,
};
