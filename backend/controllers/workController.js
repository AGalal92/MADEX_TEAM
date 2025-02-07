const Work = require('../models/Work');

// Get all works
const getAllWorks = async (req, res) => {
  try {
    const works = await Work.find().populate('work_category_id', 'category title');
    res.json(works);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching works', error: error.message });
  }
};

// Get a single work by ID
const getWorkById = async (req, res) => {
  try {
    const { id } = req.params;
    const work = await Work.findById(id).populate('work_category_id', 'category title');

    if (!work) {
      return res.status(404).json({ message: 'Work not found' });
    }

    res.json(work);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching work', error: error.message });
  }
};

// Create a new work
const createWork = async (req, res) => {
  try {
    const { title, slug, work_category_id } = req.body;

    let sliderImages = [];
    if (req.files?.slider_images) {
      sliderImages = req.files.slider_images.map((file) => file.filename);
    }

    const work = new Work({
      title,
      slug,
      image: req.files?.image?.[0]?.filename || null,
      video: req.files?.video?.[0]?.filename || null,
      slider_images: sliderImages,
      image_before: req.files?.image_before?.[0]?.filename || null,
      image_after: req.files?.image_after?.[0]?.filename || null,
      work_category_id,
    });

    await work.save();
    res.status(201).json({ message: 'Work created successfully!', work });
  } catch (error) {
    res.status(500).json({ message: 'Error creating work', error: error.message });
  }
};

// Update a work
const fs = require('fs');
const path = require('path');

const updateWork = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the existing work
    const work = await Work.findById(id);
    if (!work) {
      return res.status(404).json({ message: 'Work not found' });
    }

    let updates = { ...req.body };

    // Handle new image upload
    if (req.files?.image) {
      // Delete old image
      if (work.image) {
        try {
          fs.unlinkSync(path.join(__dirname, '../storage', work.image));
        } catch (err) {
          console.warn(`Failed to delete old image: ${work.image}`);
        }
      }
      updates.image = req.files.image[0].filename;
    }

    // Handle new video upload
    if (req.files?.video) {
      // Delete old video
      if (work.video) {
        try {
          fs.unlinkSync(path.join(__dirname, '../storage', work.video));
        } catch (err) {
          console.warn(`Failed to delete old video: ${work.video}`);
        }
      }
      updates.video = req.files.video[0].filename;
    }

    // Handle `image_before` update
    if (req.files?.image_before) {
      if (work.image_before) {
        try {
          fs.unlinkSync(path.join(__dirname, '../storage', work.image_before));
        } catch (err) {
          console.warn(`Failed to delete old image_before: ${work.image_before}`);
        }
      }
      updates.image_before = req.files.image_before[0].filename;
    }

    // Handle `image_after` update
    if (req.files?.image_after) {
      if (work.image_after) {
        try {
          fs.unlinkSync(path.join(__dirname, '../storage', work.image_after));
        } catch (err) {
          console.warn(`Failed to delete old image_after: ${work.image_after}`);
        }
      }
      updates.image_after = req.files.image_after[0].filename;
    }

    // Handle `slider_images` update
    if (req.files?.slider_images) {
      const newSliderImages = req.files.slider_images.map((file) => file.filename);
      updates.slider_images = [...work.slider_images, ...newSliderImages]; // Append new images
    }

    // Update work in the database
    const updatedWork = await Work.findByIdAndUpdate(id, updates, { new: true });

    res.json({ message: 'Work updated successfully!', work: updatedWork });
  } catch (error) {
    res.status(500).json({ message: 'Error updating work', error: error.message });
  }
};


// Delete a work
const deleteWork = async (req, res) => {
  try {
    const { id } = req.params;
    const work = await Work.findByIdAndDelete(id);

    if (!work) {
      return res.status(404).json({ message: 'Work not found' });
    }

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
