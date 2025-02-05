const pool = require('../db'); // Assuming you have db.js for MySQL connection
const fs = require('fs'); // For file deletion
const path = require('path'); // For file paths

// Get specific fields (project details)
const getProject = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, image, video, work_category_id FROM works'
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching project details:', error.message);
    res.status(500).json({ message: 'Error fetching project details', error: error.message });
  }
};

// Get all works
const getAllWorks = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM works');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching works', error: error.message });
  }
};


// Get a single work by ID
const getWorkById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM works WHERE id = ?', [id]);

    res.json(rows);
  } catch (error) {
    console.error('Error fetching work:', error.message);
    res.status(500).json({ message: 'Error fetching work', error: error.message });
  }
};


// Create a new work
const createWork = async (req, res) => {
  try {
    const { title, slug, work_category_id } = req.body;

    // Validate required fields
    if (!title || !slug || !work_category_id) {
      return res.status(400).json({ message: 'Title, slug, and work_category_id are required' });
    }

    // Handle slider_images uploads
    let sliderImages = [];
    try {
      sliderImages = req.files?.slider_images
        ? req.files.slider_images.map((file) => file.filename) // Map filenames from uploaded files
        : [];
    } catch (err) {
      console.error('Error handling slider_images:', err.message);
      return res.status(400).json({ message: 'Error handling slider_images', error: err.message });
    }

    // Handle other file uploads
    const image = req.files?.image?.[0]?.filename || null;
    const video = req.files?.video?.[0]?.filename || null;
    const imageBefore = req.files?.image_before?.[0]?.filename || null;
    const imageAfter = req.files?.image_after?.[0]?.filename || null;

    // Insert data into the database
    const query = `
      INSERT INTO works (title, slug, image, video, slider_images, image_before, image_after, work_category_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.query(query, [
      title,
      slug,
      image,
      video,
      JSON.stringify(sliderImages), // Store slider images as a JSON string
      imageBefore,
      imageAfter,
      work_category_id,
    ]);

    console.log('New Work Created:', { id: result.insertId, title, slug, sliderImages });

    res.status(201).json({
      message: 'Work created successfully!',
      work: {
        id: result.insertId,
        title,
        slug,
        image,
        video,
        slider_images: sliderImages,
        image_before: imageBefore,
        image_after: imageAfter,
        work_category_id,
      },
    });
  } catch (error) {
    console.error('Error creating work:', error.message);
    res.status(500).json({ message: 'Error creating work', error: error.message });
  }
};


// Update a work
const updateWork = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch existing work data
    const [rows] = await pool.query('SELECT * FROM works WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Work not found' });
    }

    const existingWork = rows[0];

    // Extract fields from the request body
    const {
      title = existingWork.title,
      slug = existingWork.slug,
      work_category_id = existingWork.work_category_id,
      slider_images = existingWork.slider_images, // Get slider images from request body
    } = req.body;
      console.log("🚀 ~ updateWork ~ bodySliderImages:", slider_images)

      let combinedSliderImages;
      if (req.files?.slider_images) {
        // Combine existing and uploaded slider images
        const uploadedImages = req.files.slider_images.map(file => file.filename);
        combinedSliderImages = [
          ...(Array.isArray(slider_images) ? slider_images : JSON.parse(slider_images || '[]')),
          ...uploadedImages,
        ];
      } else {
        // Retain existing images if no new files are uploaded
        combinedSliderImages = Array.isArray(slider_images)
          ? slider_images
          : JSON.parse(slider_images || '[]');
      }


    // Handle other file uploads (keep existing implementation)
    const image = req.files?.image?.[0]?.filename || existingWork.image;
    const video = req.files?.video?.[0]?.filename || existingWork.video;
    const imageBefore = req.files?.image_before?.[0]?.filename || existingWork.image_before;
    const imageAfter = req.files?.image_after?.[0]?.filename || existingWork.image_after;

    // Update database
    const query = `
      UPDATE works
      SET title = ?, slug = ?, 
          image = ?, 
          video = ?, 
          slider_images = ?, 
          image_before = ?, 
          image_after = ?, 
          work_category_id = ?
      WHERE id = ?
    `;
    await pool.query(query, [
      title,
      slug,
      image,
      video,
      JSON.stringify(combinedSliderImages),
      imageBefore,
      imageAfter,
      work_category_id,
      id,
    ]);

    res.json({ 
      message: 'Work updated successfully!',
      slider_images: combinedSliderImages 
    });
    
  } catch (error) {
    console.error('Error updating work:', error);
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
      let sliderImages = [];
      try {
        sliderImages = JSON.parse(slider_images || '[]');
      } catch (error) {
        console.error('Error parsing slider_images:', error.message);
      }
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
    console.error('Error in deleteWork:', error);
    res.status(500).json({ message: 'Error deleting work', error: error.message });
  }
};

module.exports = {
  getAllWorks,
  getWorkById,
  createWork,
  updateWork,
  deleteWork,
  getProject
};