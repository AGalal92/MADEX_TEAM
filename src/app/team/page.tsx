'use client';
import React, { useState, useEffect } from 'react';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Modal,
  TextField,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Grid,
  Chip,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Edit, Delete, Add, Close } from '@mui/icons-material';
import axios from 'axios';
import Image from 'next/image';

const TeamTable = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [editMember, setEditMember] = useState(null);
  const [formData, setFormData] = useState({ name: '', position: '', image: null });
  const [imagePreview, setImagePreview] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editSocialLinkModalOpen, setEditSocialLinkModalOpen] = useState(false);
  const [currentSocialLinkIndex, setCurrentSocialLinkIndex] = useState(null);
  const [currentSocialLink, setCurrentSocialLink] = useState({ url: '', icon: '' });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API_BASE_URL = 'http://localhost:5001/api/team';
  const STORAGE_BASE_URL = 'http://localhost:5001/storage';

  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      const members = response.data.map((member) => ({
        ...member,
        social_links: Array.isArray(member.social_links)
          ? member.social_links
          : JSON.parse(member.social_links || '[]'),
      }));
      setTeamMembers(members);
    } catch (error) {
      console.error('Error fetching team members:', error);
      showSnackbar('Error fetching data.', 'error');

    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpenModal = (member = null) => {
    setEditMember(member);
    if (member) {
      setFormData({ name: member.name, position: member.position, image: null });
      setImagePreview(`${STORAGE_BASE_URL}/${member.image}`);
      setSocialLinks(member.social_links || []);
    } else {
      setFormData({ name: '', position: '', image: null });
      setImagePreview(null);
      setSocialLinks([]);
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditMember(null);
    setImagePreview(null);
  };

  const handleAddSocialLink = () => {
    setSocialLinks([...socialLinks, { url: '', icon: '' }]);
  };

  const handleOpenEditSocialLinkModal = (index) => {
    setCurrentSocialLinkIndex(index);
    setCurrentSocialLink(socialLinks[index]);
    setEditSocialLinkModalOpen(true);
  };

  const handleCloseEditSocialLinkModal = () => {
    setEditSocialLinkModalOpen(false);
    setCurrentSocialLinkIndex(null);
    setCurrentSocialLink({ url: '', icon: '' });
  };

  const handleSaveSocialLink = () => {
    const updatedLinks = [...socialLinks];
    updatedLinks[currentSocialLinkIndex] = currentSocialLink;
    setSocialLinks(updatedLinks);
    handleCloseEditSocialLinkModal();
  };

  const handleRemoveSocialLink = (index) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const data = new FormData();
    data.append('name', formData.name);
    data.append('position', formData.position);
    data.append('social_links', JSON.stringify(socialLinks));
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      if (editMember) {
        await axios.put(`${API_BASE_URL}/${editMember.id}`, data);
      } else {
        await axios.post(API_BASE_URL, data);
      }
      fetchTeamMembers();
      handleCloseModal();
      showSnackbar('team member created successfully!', 'success');
    } catch (error) {
      console.error('Error saving team member:', error);
      showSnackbar('Error saving team member!', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenDialog = (id) => {
    setDeleteId(id);
    setDialogOpen(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/${deleteId}`);
      fetchTeamMembers();
      setDialogOpen(false);
      showSnackbar('team member deleted successfully!', 'success');
    } catch (error) {
      console.error('Error deleting team member:', error);
      showSnackbar('Error deleting team member!', 'error');
    }
  };
  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <DefaultLayout>
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Team Members
        </Typography>
        <Box display="flex" justifyContent="flex-end" mb={4}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => handleOpenModal()}
            sx={{ textTransform: 'none', fontWeight: 'bold' }}
          >
            Add Member
          </Button>
        </Box>

        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
          <Table>
            <TableHead sx={{ backgroundColor: 'primary.main' }}>
              <TableRow>
                <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>Image</TableCell>
                <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>Position</TableCell>
                <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: 'action.hover' } }}>
                  <TableCell>
                    <Image
                      src={`${STORAGE_BASE_URL}/${member.image}`}
                      alt={member.name}
                      style={{ width: 50, height: 50, borderRadius: '50%' }}
                    />
                  </TableCell>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.position}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleOpenModal(member)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleOpenDialog(member.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Modal for Add/Edit */}
        <Modal open={modalOpen} onClose={handleCloseModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 800,
              maxWidth: '90vw',
              bgcolor: 'background.paper',
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '90vh',
              overflow: 'hidden',
              backfaceVisibility: 'hidden',
            }}
          >
            {/* Header */}
            <Box
              sx={{
                p: 3,
                borderBottom: 1,
                borderColor: 'divider',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                bgcolor: 'primary.main',
                color: 'white',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {editMember ? 'Edit Member' : 'Add Member'}
              </Typography>
              <IconButton onClick={handleCloseModal} sx={{ color: 'white' }}>
                <Close />
              </IconButton>
            </Box>

            {/* Scrollable Content */}
            <Box
              sx={{
                p: 3,
                overflowY: 'auto',
                flex: 1,
                '&::-webkit-scrollbar': { width: '6px' },
                '&::-webkit-scrollbar-track': { bgcolor: '#f5f5f5' },
                '&::-webkit-scrollbar-thumb': { bgcolor: '#ddd', borderRadius: '4px' },
              }}
            >
              <form id="memberForm" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Position"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        border: '1px dashed',
                        borderColor: 'divider',
                        borderRadius: 1,
                        p: 2,
                      }}
                    >
                      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                        IMAGE UPLOAD
                      </Typography>
                      <Button
                        variant="outlined"
                        component="label"
                        fullWidth
                        startIcon={<Add />}
                      >
                        Upload Image
                        <input type="file" hidden onChange={handleImageChange} />
                      </Button>
                      {imagePreview && (
                        <Box mt={2} sx={{ position: 'relative' }}>
                          <Image
                            src={imagePreview}
                            alt="Preview"
                            style={{
                              width: '100%',
                              borderRadius: 4,
                              maxHeight: 200,
                              objectFit: 'cover',
                            }}
                          />
                          <IconButton
                            size="small"
                            sx={{
                              position: 'absolute',
                              top: 4,
                              right: 4,
                              bgcolor: 'background.paper',
                              '&:hover': { bgcolor: 'error.light' },
                            }}
                            onClick={() => {
                              setFormData((prev) => ({ ...prev, image: null }));
                              setImagePreview(null);
                            }}
                          >
                            <Close fontSize="small" />
                          </IconButton>
                        </Box>
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        border: '1px dashed',
                        borderColor: 'divider',
                        borderRadius: 1,
                        p: 2,
                      }}
                    >
                      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                        SOCIAL LINKS (MAX 5)
                      </Typography>
                      <Button
                        variant="outlined"
                        onClick={handleAddSocialLink}
                        fullWidth
                        startIcon={<Add />}
                        disabled={socialLinks.length >= 5}
                      >
                        Add Social Link
                      </Button>
                      <Box
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 2,
                          mt: 2,
                          maxHeight: 300,
                          overflowY: 'auto',
                          p: 1,
                        }}
                      >
                        {socialLinks.map((link, index) => (
                          <Box
                            key={index}
                            sx={{
                              position: 'relative',
                              border: '1px solid',
                              borderColor: 'divider',
                              borderRadius: 1,
                              p: 0.5,
                              cursor: 'pointer',
                            }}
                            onClick={() => handleOpenEditSocialLinkModal(index)}
                          >
                            <TextField
                              fullWidth
                              value={link.url}
                              placeholder={`Link ${index + 1}`}
                              variant="outlined"
                              sx={{ width: 200 }}
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                            <IconButton
                              size="small"
                              sx={{
                                position: 'absolute',
                                top: -8,
                                right: -8,
                                bgcolor: 'background.paper',
                                boxShadow: 1,
                                '&:hover': { bgcolor: 'error.light' },
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveSocialLink(index);
                              }}
                            >
                              <Close fontSize="small" />
                            </IconButton>
                            <Chip
                              label={`#${index + 1}`}
                              size="small"
                              sx={{
                                position: 'absolute',
                                bottom: 4,
                                left: 4,
                                bgcolor: 'rgba(0,0,0,0.6)',
                                color: 'white',
                              }}
                            />
                          </Box>
                        ))}
                      </Box>
                      <Typography variant="caption" sx={{ mt: 1, display: 'block', textAlign: 'center' }}>
                        {socialLinks.length}/5 items selected
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </Box>

            {/* Footer */}
            <Box
              sx={{
                p: 2,
                borderTop: 1,
                borderColor: 'divider',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 2,
              }}
            >
              <Button
                onClick={handleCloseModal}
                variant="outlined"
                color="inherit"
                startIcon={<Close />}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                form="memberForm"
                variant="contained"
                color="primary"
                startIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : editMember ? <Edit /> : <Add />}
                disabled={isSubmitting}               
              >
               {isSubmitting ? 'Submitting...' : editMember ? 'Update' : 'Create'}
              </Button>
            </Box>
          </Box>
        </Modal>
                {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity as 'success' | 'error' | 'warning' | 'info'} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

        {/* Modal for Editing Social Links */}
        <Modal open={editSocialLinkModalOpen} onClose={handleCloseEditSocialLinkModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              borderRadius: 2,
              p: 3,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Edit Social Link
            </Typography>
            <TextField
              fullWidth
              label="URL"
              value={currentSocialLink.url}
              onChange={(e) => setCurrentSocialLink({ ...currentSocialLink, url: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Icon"
              value={currentSocialLink.icon}
              onChange={(e) => setCurrentSocialLink({ ...currentSocialLink, icon: e.target.value })}
              sx={{ mb: 2 }}
            />
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                onClick={handleCloseEditSocialLinkModal}
                variant="outlined"
                color="inherit"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveSocialLink}
                variant="contained"
                color="primary"
              >
                Save
              </Button>
            </Box>
          </Box>
        </Modal>

        {/* Dialog for Delete Confirmation */}
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>Are you sure you want to delete this member?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleDelete} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </DefaultLayout>
  );
};

export default TeamTable;