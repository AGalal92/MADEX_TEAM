const mongoose = require('mongoose');

const workCategorySchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    title: { type: String, required: true },
  },
  { timestamps: true } // Automatically creates `createdAt` and `updatedAt`
);

module.exports = mongoose.model('WorkCategory', workCategorySchema);
