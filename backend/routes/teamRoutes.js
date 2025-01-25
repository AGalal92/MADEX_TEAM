const express = require('express');
const upload = require('../middleware/upload'); // Multer upload middleware
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
router.post('/', upload.fields([{ name: 'image', maxCount: 1 }]), createTeamMember);
router.put('/:id', upload.fields([{ name: 'image', maxCount: 1 }]), updateTeamMember);
router.delete('/:id', deleteTeamMember);

module.exports = router;
