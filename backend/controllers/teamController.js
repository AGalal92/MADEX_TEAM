const pool = require('../db'); // Assuming db.js exports the MySQL pool

// Get all team members
const getAllTeamMembers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM team');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team members', error: error.message });
  }
};

// Get a single team member by ID
const getTeamMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM team WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team member', error: error.message });
  }
};

// Create a new team member
const createTeamMember = async (req, res) => {
  try {
    const { name, position, social_links } = req.body;

    const image = req.files?.image ? req.files.image[0].filename : null;

    const query = `
      INSERT INTO team (image, name, position, social_links)
      VALUES (?, ?, ?, ?)
    `;
    await pool.query(query, [image, name, position, JSON.stringify(social_links)]);

    res.status(201).json({ message: 'Team member created successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating team member', error: error.message });
  }
};

// Update a team member
const updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, position, social_links } = req.body;

    const image = req.files?.image ? req.files.image[0].filename : null;

    const query = `
      UPDATE team
      SET image = ?, name = ?, position = ?, social_links = ?
      WHERE id = ?
    `;
    await pool.query(query, [image, name, position, JSON.stringify(social_links), id]);

    res.json({ message: 'Team member updated successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating team member', error: error.message });
  }
};

// Delete a team member
const deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query('SELECT image FROM team WHERE id = ?', [id]);

    if (rows.length > 0 && rows[0].image) {
      fs.unlinkSync(path.join(__dirname, '../storage', rows[0].image));
    }

    await pool.query('DELETE FROM team WHERE id = ?', [id]);

    res.json({ message: 'Team member deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting team member', error: error.message });
  }
};

module.exports = {
  getAllTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
};
