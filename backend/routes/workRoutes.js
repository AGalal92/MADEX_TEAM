const express = require('express');
const { upload, compressFiles } = require('../middleware/upload'); // Import both
const {
  getAllWorks,
  getWorkById,
  createWork,
  updateWork,
  deleteWork,
  getProject
} = require('../controllers/workController');

const router = express.Router();

router.get('/', getAllWorks);
router.get('/project', getProject);
router.get('/:id', getWorkById);

router.post(
    '/',
    upload.fields([
      { name: 'image', maxCount: 1 },
      { name: 'video', maxCount: 1 },
      { name: 'slider_images', maxCount: 10 },
      { name: 'image_before', maxCount: 1 },
      { name: 'image_after', maxCount: 1 },
    ]),compressFiles,
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
      { name: 'image_before', maxCount: 1 },
      { name: 'image_after', maxCount: 1 },
    ]),compressFiles, updateWork
  );
router.delete('/:id', deleteWork);

module.exports = router;
