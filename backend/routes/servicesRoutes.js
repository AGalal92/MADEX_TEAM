const express = require('express');
const upload = require('../middleware/upload'); // Multer upload middleware
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
router.post('/', upload.fields([{ name: 'image', maxCount: 1 }]), createService);
router.put('/:id', upload.fields([{ name: 'image', maxCount: 1 }]), updateService);
router.delete('/:id', deleteService);

module.exports = router;
