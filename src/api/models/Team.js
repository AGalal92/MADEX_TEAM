const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema(
  {
    image: { type: String, default: null },
    name: { type: String, required: true },
    position: { type: String, required: true },
    social_links: [
      {
        url: { type: String, required: true },
        icon: { type: String, required: true },
      },
    ], // Now expects an array of objects
  },
  { timestamps: true }
);

module.exports = mongoose.model('Team', teamSchema);
