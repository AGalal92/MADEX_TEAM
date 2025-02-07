// models/About.js
const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema(
  {
    title: { type: String, default: '' },
    img1: { type: String, default: null },
    img2: { type: String, default: null },
    slug1: { type: String, default: '' },
    slug2: { type: String, default: '' },
    par1: { type: String, default: null },
    par2: { type: String, default: null },
    list_items: { type: Array, default: [] },
    link: { type: String, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model('About', aboutSchema);
