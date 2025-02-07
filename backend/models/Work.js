const mongoose = require('mongoose');

const workSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    image: { type: String, default: null },
    video: { type: String, default: null },
    slider_images: { type: [String], default: [] }, // Ensures slider images are stored as an array
    image_before: { type: String, default: null },
    image_after: { type: String, default: null },
    work_category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'WorkCategory', // Reference to the WorkCategory model
      required: true,
    },
  },
  { timestamps: true } // Automatically creates `createdAt` and `updatedAt`
);

module.exports = mongoose.model('Work', workSchema);
