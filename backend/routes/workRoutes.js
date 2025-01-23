const express = require('express');
const upload = require('../middleware/upload'); // File upload middleware
const {
  getAllWorks,
  getWorkById,
  createWork,
  updateWork,
  deleteWork,
} = require('../controllers/workController');

const router = express.Router();

router.get('/', getAllWorks);
router.get('/:id', getWorkById);

router.post(
    '/',
    upload.fields([
      { name: 'image', maxCount: 1 },
      { name: 'video', maxCount: 1 },
      { name: 'slider_images', maxCount: 10 },
    ]),
    (req, res, next) => {
      console.log('Files:', req.files); // Log uploaded files
      console.log('Body:', req.body);   // Log form-data fields
      next();
    },
    createWork
  );
  
  
  router.put(
    '/:id',
    upload.fields([
      { name: 'image', maxCount: 1 },
      { name: 'video', maxCount: 1 },
      { name: 'slider_images', maxCount: 10 },
    ]),
    updateWork
  );
router.delete('/:id', deleteWork);

module.exports = router;
