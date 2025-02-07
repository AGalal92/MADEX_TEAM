const Team = require('../models/Team');
const path = require('path');
const fs = require('fs');

// Get all team members
const getAllTeamMembers = async (req, res) => {
  try {
    const team = await Team.find();
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team members', error: error.message });
  }
};

// Get a single team member by ID
const getTeamMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Team.findById(id);

    if (!member) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    res.json(member);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team member', error: error.message });
  }
};

// Create a new team member
const createTeamMember = async (req, res) => {
  try {
    const { name, position, social_links } = req.body;

    const image = req.files?.image ? req.files.image[0].filename : null;

    // Ensure social_links is always an array
    let sanitizedSocialLinks = [];
    if (social_links) {
      try {
        sanitizedSocialLinks = JSON.parse(social_links);
        if (!Array.isArray(sanitizedSocialLinks)) {
          throw new Error('social_links must be an array');
        }
      } catch (error) {
        return res.status(400).json({ message: 'Invalid social_links format. Must be a JSON array.' });
      }
    }

    const member = new Team({
      name,
      position,
      social_links: sanitizedSocialLinks,
      image,
    });

    await member.save();
    res.status(201).json({ message: 'Team member created successfully!', member });
  } catch (error) {
    res.status(500).json({ message: 'Error creating team member', error: error.message });
  }
};

// Update a team member
const updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    let updates = { ...req.body };

    if (updates.social_links) {
      try {
        updates.social_links = JSON.parse(updates.social_links);
        if (!Array.isArray(updates.social_links)) {
          throw new Error('social_links must be an array');
        }
      } catch (error) {
        return res.status(400).json({ message: 'Invalid social_links format. Must be a JSON array.' });
      }
    }

    if (req.files?.image) {
      updates.image = req.files.image[0].filename;
    }

    const member = await Team.findByIdAndUpdate(id, updates, { new: true });

    if (!member) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    res.json({ message: 'Team member updated successfully!', member });
  } catch (error) {
    res.status(500).json({ message: 'Error updating team member', error: error.message });
  }
};

// Delete a team member
const deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;

    const member = await Team.findById(id);
    if (!member) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    if (member.image) fs.unlinkSync(path.join(__dirname, '../storage', member.image));

    await Team.findByIdAndDelete(id);
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
