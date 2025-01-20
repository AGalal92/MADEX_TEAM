const db = require('../config/db');

// Get the "about" data for a specific ID
const getAbout = (req, res) => {
    const sql = 'SELECT * FROM about'; // Fetch all records from the "about" table
  
    db.query(sql, (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Error fetching about data', error: err });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ message: 'No records found' });
      }
  
      res.status(200).json(results); // Return all records
    });
  };
  
  module.exports = {
    getAbout,
  };
  

// Update the "about" data for a specific ID
const updateAbout = (req, res) => {
    const { id } = req.params; // Get the ID from the request parameters
    const updatedData = req.body; // Data to update
  
    // Fetch existing data first
    const selectSql = 'SELECT * FROM about WHERE id = ?';
    db.query(selectSql, [id], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error fetching about data', error: err });
      }
  
      if (result.length === 0) {
        return res.status(404).json({ message: `No record found with ID ${id}` });
      }
  
      // Merge existing data with the updated data
      const existingData = result[0];
      const newData = {
        title: updatedData.title || existingData.title,
        img1: updatedData.img1 || existingData.img1,
        par1: updatedData.par1 || existingData.par1,
        par2: updatedData.par2 || existingData.par2,
        slug1: updatedData.slug1 || existingData.slug1,
        slug2: updatedData.slug2 || existingData.slug2,
        img2: updatedData.img2 || existingData.img2,
        link: updatedData.link || existingData.link,
      };
  
      // Perform the update
      const updateSql = `
        UPDATE about 
        SET title = ?, img1 = ?, par1 = ?, par2 = ?, slug1 = ?, slug2 = ?, img2 = ?, link = ?
        WHERE id = ?
      `;
      const values = [
        newData.title,
        newData.img1,
        newData.par1,
        newData.par2,
        newData.slug1,
        newData.slug2,
        newData.img2,
        newData.link,
        id,
      ];
  
      db.query(updateSql, values, (updateErr, updateResult) => {
        if (updateErr) {
          return res.status(500).json({ message: 'Error updating about data', error: updateErr });
        }
  
        res.status(200).json({ message: `About data with ID ${id} updated successfully`, data: newData });
      });
    });
  };

// Delete a field in the "about" data for a specific ID
const deleteField = (req, res) => {
  const { id } = req.params; // Get the ID from the request parameters
  const { field } = req.params; // Get the field to delete from the request parameters
  const allowedFields = ['title', 'img1', 'par1', 'par2', 'slug1', 'slug2', 'img2', 'link'];

  if (!allowedFields.includes(field)) {
    return res.status(400).json({ message: `Invalid field: "${field}"` });
  }

  const sql = `UPDATE about SET ${field} = NULL WHERE id = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: `Error deleting field "${field}"`, error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: `No record found with ID ${id}` });
    }

    res.status(200).json({ message: `Field "${field}" deleted successfully for ID ${id}` });
  });
};

// Reset "about" data to its initial state for a specific ID
const resetAbout = (req, res) => {
  const { id } = req.params; // Get the ID from the request parameters

  const sql = `
    UPDATE about 
    SET title = 'About Us', 
        img1 = '/assets/images/about.jpg', 
        par1 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
        par2 = 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 
        slug1 = 'Our mission is to provide high-quality services and solutions to our clients.', 
        slug2 = 'We strive to deliver innovative and reliable solutions that meet the needs of our clients.', 
        img2 = '/assets/images/about-2.jpg', 
        link = 'https://www.youtube.com/watch?v=example'
    WHERE id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error resetting about data', error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: `No record found with ID ${id}` });
    }

    res.status(200).json({ message: `About data with ID ${id} reset to initial state` });
  });
};

module.exports = {
  getAbout,
  updateAbout,
  deleteField,
  resetAbout,
};
