const express = require('express');
const { upload, compressFiles } = require('../middleware/upload'); // Import both

const {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} = require('../controllers/servicesController');

const router = express.Router();

router.get('/', getAllServices);
router.get('/:id', getServiceById);
router.post('/', upload.fields([{ name: 'image', maxCount: 1 }]), compressFiles, createService);
router.put('/:id', upload.fields([{ name: 'image', maxCount: 1 }]), compressFiles, updateService);
router.delete('/:id', deleteService);

module.exports = router;
