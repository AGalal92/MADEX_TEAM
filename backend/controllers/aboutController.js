const About = require('../models/About');
const path = require('path');
const fs = require('fs');

const createAbout = async (req, res) => {
  try {
    const { title, slug1, slug2, par1, par2, link, list_items } = req.body;

    const img1 = req.files?.img1 ? req.files.img1[0].filename : null;
    const img2 = req.files?.img2 ? req.files.img2[0].filename : null;

      // Ensure list_items is always an array
      let sanitizedListItems = [];
      if (list_items) {
        try {
          sanitizedListItems = JSON.parse(list_items);
          if (!Array.isArray(sanitizedListItems)) {
            throw new Error('list_items must be an array');
          }
        } catch (error) {
          return res.status(400).json({ message: 'Invalid list_items format. Must be a JSON array.' });
        }
      }


    const about = new About({
      title,
      slug1,
      slug2,
      par1,
      par2,
      link,
      list_items: sanitizedListItems,
      img1,
      img2,
    });

    await about.save();
    res.status(201).json({ message: 'About created successfully!', about });
  } catch (error) {
    res.status(500).json({ message: 'Error creating about', error: error.message });
  }
};

const updateAbout = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
      // Ensure list_items is an array
      if (updates.list_items) {
        try {
          updates.list_items = JSON.parse(updates.list_items);
          if (!Array.isArray(updates.list_items)) {
            throw new Error('list_items must be an array');
          }
        } catch (error) {
          return res.status(400).json({ message: 'Invalid list_items format. Must be a JSON array.' });
        }
      }

    if (req.files?.img1) {
      updates.img1 = req.files.img1[0].filename;
    }
    if (req.files?.img2) {
      updates.img2 = req.files.img2[0].filename;
    }

    const about = await About.findByIdAndUpdate(id, updates, { new: true });

    if (!about) {
      return res.status(404).json({ message: 'About not found' });
    }

    res.json({ message: 'About updated successfully!', about });
  } catch (error) {
    res.status(500).json({ message: 'Error updating about', error: error.message });
  }
};

const deleteAbout = async (req, res) => {
  try {
    const { id } = req.params;

    const about = await About.findById(id);

    if (!about) {
      return res.status(404).json({ message: 'About not found' });
    }

    if (about.img1) fs.unlinkSync(path.join(__dirname, '../storage', about.img1));
    if (about.img2) fs.unlinkSync(path.join(__dirname, '../storage', about.img2));

    await About.findByIdAndDelete(id);
    res.json({ message: 'About deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting about', error: error.message });
  }
};

const getAllAbouts = async (req, res) => {
  try {
    const abouts = await About.find();
    res.json(abouts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching abouts', error: error.message });
  }
};

const getAboutById = async (req, res) => {
  try {
    const { id } = req.params;

    const about = await About.findById(id);
    if (!about) {
      return res.status(404).json({ message: 'About not found' });
    }

    res.json(about);
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
