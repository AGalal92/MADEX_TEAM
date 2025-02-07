const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    icon: { type: String, required: true },
    image: { type: String, default: null },
    heading: { type: String, required: true },
    description: { type: String, required: true },
    list_items: { type: [String], default: [] }, // Ensures array format
    paragraph: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Service', serviceSchema);
