const Service = require('../models/Service');
const path = require('path');
const fs = require('fs');

// Get all services
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services', error: error.message });
  }
};

// Get a single service by ID
const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching service', error: error.message });
  }
};

// Create a new service
const createService = async (req, res) => {
  try {
    const { title, icon, heading, description, paragraph, list_items } = req.body;

    const image = req.files?.image ? req.files.image[0].filename : null;

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

    const service = new Service({
      title,
      icon,
      image,
      heading,
      description,
      list_items: sanitizedListItems,
      paragraph,
    });

    await service.save();
    res.status(201).json({ message: 'Service created successfully!', service });
  } catch (error) {
    res.status(500).json({ message: 'Error creating service', error: error.message });
  }
};

// Update a service
const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    let updates = { ...req.body };

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

    if (req.files?.image) {
      updates.image = req.files.image[0].filename;
    }

    const service = await Service.findByIdAndUpdate(id, updates, { new: true });

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json({ message: 'Service updated successfully!', service });
  } catch (error) {
    res.status(500).json({ message: 'Error updating service', error: error.message });
  }
};

// Delete a service
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    if (service.image) fs.unlinkSync(path.join(__dirname, '../storage', service.image));

    await Service.findByIdAndDelete(id);
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
