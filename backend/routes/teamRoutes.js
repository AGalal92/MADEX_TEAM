const express = require('express');
const { upload, compressFiles } = require('../middleware/upload'); // Import both

const {
  getAllTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} = require('../controllers/teamController');

const router = express.Router();

router.get('/', getAllTeamMembers);
router.get('/:id', getTeamMemberById);
router.post('/', upload.fields([{ name: 'image', maxCount: 1 }]), compressFiles, createTeamMember);
router.put('/:id', upload.fields([{ name: 'image', maxCount: 1 }]),compressFiles,  updateTeamMember);
router.delete('/:id', deleteTeamMember);

module.exports = router;
