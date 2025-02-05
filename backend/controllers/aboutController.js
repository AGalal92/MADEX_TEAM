const pool = require('../db'); // Assuming db.js exports the MySQL pool
const path = require('path');
const fs = require('fs');

// Function to create a new about
const createAbout = async (req, res) => {
  try {
    const { title, slug1, slug2, par1, par2, link, list_items } = req.body;

    const img1 = req.files?.img1 ? req.files.img1[0].filename : null;
    const img2 = req.files?.img2 ? req.files.img2[0].filename : null;

    // Parse list_items and ensure it's an array
    const sanitizedListItems = list_items ? JSON.parse(list_items) : [];

    const query = `
      INSERT INTO abouts (title, img1, img2, slug1, slug2, par1, par2, link, list_items)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await pool.query(query, [
      title,
      img1,
      img2,
      slug1,
      slug2,
      par1,
      par2,
      link,
      JSON.stringify(sanitizedListItems), // Save as JSON string
    ]);

    res.status(201).json({ message: 'About created successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating about', error: error.message });
  }
};

// Function to update an about
const updateAbout = async (req, res) => {
  try {
    const { id } = req.params;

    let updateFields = [];
    let updateValues = [];

    const { title, slug1, slug2, par1, par2, link, list_items } = req.body;

    if (title) {
      updateFields.push('title = ?');
      updateValues.push(title);
    }
    if (slug1) {
      updateFields.push('slug1 = ?');
      updateValues.push(slug1);
    }
    if (slug2) {
      updateFields.push('slug2 = ?');
      updateValues.push(slug2);
    }
    if (par1) {
      updateFields.push('par1 = ?');
      updateValues.push(par1);
    }
    if (par2) {
      updateFields.push('par2 = ?');
      updateValues.push(par2);
    }
    if (link) {
      updateFields.push('link = ?');
      updateValues.push(link);
    }

    // Handle list_items: parse and ensure it's an array
    if (list_items) {
      const sanitizedListItems = JSON.parse(list_items);
      updateFields.push('list_items = ?');
      updateValues.push(JSON.stringify(sanitizedListItems));
    }

    if (req.files?.img1) {
      updateFields.push('img1 = ?');
      updateValues.push(req.files.img1[0].filename);
    }
    if (req.files?.img2) {
      updateFields.push('img2 = ?');
      updateValues.push(req.files.img2[0].filename);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ message: 'No fields to update' });
    }

    updateValues.push(id);

    const query = `
      UPDATE abouts
      SET ${updateFields.join(', ')}
      WHERE id = ?
    `;

    await pool.query(query, updateValues);

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