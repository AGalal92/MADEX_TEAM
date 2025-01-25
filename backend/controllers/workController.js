const pool = require('../db'); // Assuming you have db.js for MySQL connection
const fs = require('fs'); // For file deletion
const path = require('path'); // For file paths

// Get all works
// Get all works
const getAllWorks = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM works');
    // Parse slider_images from JSON string to array
    const works = rows.map((work) => {
      try {
        return {
          ...work,
          slider_images: JSON.parse(work.slider_images || '[]'), // Default to empty array if parsing fails
        };
      } catch (error) {
        console.error('Error parsing slider_images:', error.message);
        return {
          ...work,
          slider_images: [], // Default to empty array if parsing fails
        };
      }
    });
    res.json(works);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching works', error: error.message });
  }
};

// Get a single work by ID
const getWorkById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM works WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Work not found' });
    }

    // Parse slider_images from JSON string to array
    let sliderImages = [];
    try {
      sliderImages = JSON.parse(rows[0].slider_images || '[]');
    } catch (error) {
      console.error('Error parsing slider_images:', error.message);
    }

    const work = {
      ...rows[0],
      slider_images: sliderImages,
    };

    res.json(work);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching work', error: error.message });
  }
};

// Create a new work
// Create a new work
const createWork = async (req, res) => {
  try {
    const { title, slug, work_category_id } = req.body;

    // Validate required fields
    if (!title || !slug || !work_category_id) {
      return res.status(400).json({ message: 'Title, slug, and work_category_id are required' });
    }

    // Handle single files
    const image = req.files?.image ? req.files.image[0].filename : null;
    const video = req.files?.video ? req.files.video[0].filename : null;
    const imageBefore = req.files?.image_before ? req.files.image_before[0].filename : null;
    const imageAfter = req.files?.image_after ? req.files.image_after[0].filename : null;

    // Handle multiple slider images
    const slider_images = req.files?.slider_images
      ? req.files.slider_images.map((file) => file.filename)
      : [];

    const query = `
      INSERT INTO works (title, slug, image, video, slider_images, image_before, image_after, work_category_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await pool.query(query, [
      title,
      slug,
      image,
      video,
      JSON.stringify(slider_images), // Ensure valid JSON string
      imageBefore,
      imageAfter,
      work_category_id,
    ]);

    res.status(201).json({ message: 'Work created successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating work', error: error.message });
  }
};

// Update a work
const updateWork = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, slug, work_category_id } = req.body;

    // Validate required fields
    if (!title || !slug || !work_category_id) {
      return res.status(400).json({ message: 'Title, slug, and work_category_id are required' });
    }

    // Handle single files
    const image = req.files?.image ? req.files.image[0].filename : null;
    const video = req.files?.video ? req.files.video[0].filename : null;
    const imageBefore = req.files?.image_before ? req.files.image_before[0].filename : null;
    const imageAfter = req.files?.image_after ? req.files.image_after[0].filename : null;

    // Handle multiple slider images
    const slider_images = req.files?.slider_images
      ? req.files.slider_images.map((file) => file.filename)
      : [];

    const query = `
      UPDATE works
      SET title = ?, slug = ?, image = ?, video = ?, slider_images = ?, image_before = ?, image_after = ?, work_category_id = ?
      WHERE id = ?
    `;
    await pool.query(query, [
      title,
      slug,
      image,
      video,
      JSON.stringify(slider_images), // Save as JSON string
      imageBefore,
      imageAfter,
      work_category_id,
      id,
    ]);

    res.json({ message: 'Work updated successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating work', error: error.message });
  }
};

// Delete a work
const deleteWork = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch work details to delete associated files
    const [rows] = await pool.query(
      'SELECT image, video, slider_images, image_before, image_after FROM works WHERE id = ?',
      [id]
    );

    if (rows.length > 0) {
      const { image, video, slider_images, image_before, image_after } = rows[0];

      // Delete image file
      if (image) {
        fs.unlinkSync(path.join(__dirname, '../storage', image));
      }

      // Delete video file
      if (video) {
        fs.unlinkSync(path.join(__dirname, '../storage', video));
      }

      // Delete slider images
      const sliderImages = JSON.parse(slider_images || '[]');
      sliderImages.forEach((sliderImage) => {
        fs.unlinkSync(path.join(__dirname, '../storage', sliderImage));
      });

      // Delete image_before file
      if (image_before) {
        fs.unlinkSync(path.join(__dirname, '../storage', image_before));
      }

      // Delete image_after file
      if (image_after) {
        fs.unlinkSync(path.join(__dirname, '../storage', image_after));
      }
    }

    // Delete work from database
    await pool.query('DELETE FROM works WHERE id = ?', [id]);

    res.json({ message: 'Work deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting work', error: error.message });
  }
};

module.exports = {
  getAllWorks,
  getWorkById,
  createWork,
  updateWork,
  deleteWork,
};