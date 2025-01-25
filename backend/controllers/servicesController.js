const pool = require('../db'); // Assuming db.js exports the MySQL pool

// Get all services
const getAllServices = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM services');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services', error: error.message });
  }
};

// Get a single service by ID
const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM services WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching service', error: error.message });
  }
};

// Create a new service
const createService = async (req, res) => {
  try {
    const { title, icon, heading, description, paragraph } = req.body;

    const image = req.files?.image ? req.files.image[0].filename : null;
    const list_items = req.body.list_items ? JSON.stringify(req.body.list_items) : '[]';

    const query = `
      INSERT INTO services (title, icon, image, heading, description, list_items, paragraph)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    await pool.query(query, [title, icon, image, heading, description, list_items, paragraph]);

    res.status(201).json({ message: 'Service created successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating service', error: error.message });
  }
};

// Update a service
const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, icon, heading, description, paragraph } = req.body;

    const image = req.files?.image ? req.files.image[0].filename : null;
    const list_items = req.body.list_items ? JSON.stringify(req.body.list_items) : '[]';

    const query = `
      UPDATE services
      SET title = ?, icon = ?, image = ?, heading = ?, description = ?, list_items = ?, paragraph = ?
      WHERE id = ?
    `;
    await pool.query(query, [
      title,
      icon,
      image,
      heading,
      description,
      list_items,
      paragraph,
      id,
    ]);

    res.json({ message: 'Service updated successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating service', error: error.message });
  }
};

// Delete a service
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query('SELECT image FROM services WHERE id = ?', [id]);

    if (rows.length > 0 && rows[0].image) {
      fs.unlinkSync(path.join(__dirname, '../storage', rows[0].image));
    }

    await pool.query('DELETE FROM services WHERE id = ?', [id]);

    res.json({ message: 'Service deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting service', error: error.message });
  }
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
