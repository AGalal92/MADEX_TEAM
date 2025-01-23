const pool = require('../db'); // Assuming you have db.js for MySQL connection

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

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Work not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching work', error: error.message });
  }
};


// Create a new work
const createWork = async (req, res) => {
    try {
      const { title, slug, work_category_id } = req.body;
  
      // Handle single files
      const image = req.files?.image ? req.files.image[0].filename : null;
      const video = req.files?.video ? req.files.video[0].filename : null;
  
      // Handle multiple slider images
      const slider_images = req.files?.slider_images
        ? req.files.slider_images.map((file) => file.filename)
        : [];
  
      const query = `
        INSERT INTO works (title, slug, image, video, slider_images, work_category_id)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      await pool.query(query, [
        title,
        slug,
        image,
        video,
        JSON.stringify(slider_images), // Save as JSON string
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
  
      // Handle single files
      const image = req.files?.image ? req.files.image[0].filename : null;
      const video = req.files?.video ? req.files.video[0].filename : null;
  
      // Handle multiple slider images
      const slider_images = req.files?.slider_images
        ? req.files.slider_images.map((file) => file.filename)
        : [];
  
      const query = `
        UPDATE works
        SET title = ?, slug = ?, image = ?, video = ?, slider_images = ?, work_category_id = ?
        WHERE id = ?
      `;
      await pool.query(query, [
        title,
        slug,
        image,
        video,
        JSON.stringify(slider_images), // Save as JSON string
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

    const [rows] = await pool.query('SELECT image, video FROM works WHERE id = ?', [id]);

    if (rows.length > 0) {
      const { image, video } = rows[0];

      if (image) fs.unlinkSync(path.join(__dirname, '../storage', image));
      if (video) fs.unlinkSync(path.join(__dirname, '../storage', video));
    }

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
