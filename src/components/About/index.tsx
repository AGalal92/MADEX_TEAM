'use client';
import React, { useState, useEffect } from 'react';
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
  Grid,
  Typography,
  useTheme,
  Chip,
  Snackbar,
  Alert,
  CircularProgress,
  AlertColor,
} from '@mui/material';
import { Edit, Delete, Add, Close } from '@mui/icons-material';
import axios from 'axios';

const AboutsTable = () => {
  const [abouts, setAbouts] = useState([]);
  const [editAbout, setEditAbout] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    slug1: '',
    slug2: '',
    par1: '',
    par2: '',
    link: '',
    img1: null,
    img2: null,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [img1Preview, setImg1Preview] = useState(null);
  const [img2Preview, setImg2Preview] = useState(null);
  const [listItems, setListItems] = useState([]); // State for managing list_items
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API_BASE_URL = 'http://localhost:5001/api/abouts';
  const STORAGE_BASE_URL = 'http://localhost:5001/storage';

  const theme = useTheme();

  const fetchAbouts = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setAbouts(response.data);
    } catch (error) {
      console.error('Error fetching abouts:', error);
      showSnackbar('Error fetching data.', 'error');
    }
  };

  useEffect(() => {
    fetchAbouts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, [field]: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        if (field === 'img1') {
          setImg1Preview(reader.result);
        } else if (field === 'img2') {
          setImg2Preview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleListItemChange = (index, value) => {
    const updatedListItems = [...listItems];
    updatedListItems[index] = value; // Allow whitespace
    setListItems(updatedListItems);
  };

  const handleAddListItem = () => {
    setListItems([...listItems, '']);
  };

  const handleRemoveListItem = (index) => {
    const updatedListItems = listItems.filter((_, i) => i !== index);
    setListItems(updatedListItems);
  };

  const handleOpenModal = (about = null) => {
    setEditAbout(about);
    if (about) {
      setFormData({
        title: about.title,
        slug1: about.slug1,
        slug2: about.slug2,
        par1: about.par1,
        par2: about.par2,
        link: about.link,
        img1: about.img1,
        img2: about.img2,
      });
      setListItems(about.list_items || []); // Initialize list_items
      setImg1Preview(about.img1 ? `${STORAGE_BASE_URL}/${about.img1}` : null);
      setImg2Preview(about.img2 ? `${STORAGE_BASE_URL}/${about.img2}` : null);
    } else {
      setFormData({
        title: '',
        slug1: '',
        slug2: '',
        par1: '',
        par2: '',
        link: '',
        img1: null,
        img2: null,
      });
      setListItems([]); // Reset list_items for new entries
      setImg1Preview(null);
      setImg2Preview(null);
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const data = new FormData();
    data.append('title', formData.title);
    data.append('slug1', formData.slug1);
    data.append('slug2', formData.slug2);
    data.append('par1', formData.par1);
    data.append('par2', formData.par2);
    data.append('link', formData.link);
    data.append('list_items', JSON.stringify(listItems)); // Send list_items as JSON string

    // Append images only if they are updated
    if (formData.img1 instanceof File) {
      data.append('img1', formData.img1);
    }
    if (formData.img2 instanceof File) {
      data.append('img2', formData.img2);
    }

    try {
      if (editAbout) {
        await axios.put(`${API_BASE_URL}/${editAbout.id}`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        showSnackbar('About entry updated successfully!', 'success');
      } else {
        await axios.post(API_BASE_URL, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        showSnackbar('About entry created successfully!', 'success');
      }

      fetchAbouts();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving about:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditAbout(null);
    setImg1Preview(null);
    setImg2Preview(null);
  };

  const handleOpenDialog = (id) => {
    setDeleteId(id);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setDeleteId(null);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/${deleteId}`);
      fetchAbouts();
      handleCloseDialog();
      showSnackbar('About entry deleted successfully!', 'success');
    } catch (error) {
      console.error('Error deleting about:', error);
      showSnackbar('Failed to delete about entry.', 'error');
    }
  };
  const [listItemModalOpen, setListItemModalOpen] = useState(false);
  const [selectedListItem, setSelectedListItem] = useState({ index: null, value: '' });
  const handleOpenListItemModal = (index, value) => {
    setSelectedListItem({ index, value });
    setListItemModalOpen(true);
  };

  const handleCloseListItemModal = () => {
    setListItemModalOpen(false);
    setSelectedListItem({ index: null, value: '' });
  };

  const handleListItemModalSave = () => {
    const updatedListItems = [...listItems];
    updatedListItems[selectedListItem.index] = selectedListItem.value;
    setListItems(updatedListItems);
    handleCloseListItemModal();
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
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
        Abouts Table
      </Typography>
      <Box display="flex" justifyContent="flex-end" mb={4}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => handleOpenModal()}
          disabled={abouts.length > 0} // Disable button if there's any data
          sx={{ textTransform: 'none', fontWeight: 'bold' }}
        >
          Create
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: theme.palette.primary.main }}>
            <TableRow>
              <TableCell sx={{ color: theme.palette.common.white, fontWeight: 'bold' }}>Title</TableCell>
              <TableCell sx={{ color: theme.palette.common.white, fontWeight: 'bold' }}>Slug 1</TableCell>
              <TableCell sx={{ color: theme.palette.common.white, fontWeight: 'bold' }}>Slug 2</TableCell>
              <TableCell sx={{ color: theme.palette.common.white, fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {abouts.map((about) => (
              <TableRow
                key={about.id}
                sx={{ '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover } }}
              >
                <TableCell>{about.title}</TableCell>
                <TableCell>{about.slug1}</TableCell>
                <TableCell>{about.slug2}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenModal(about)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleOpenDialog(about.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Create/Update */}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: 800 },
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            outline: 'none',
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
        >
          {/* Modal Header */}
          <Box
            sx={{
              p: 3,
              borderBottom: `1px solid ${theme.palette.divider}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              bgcolor: theme.palette.primary.main,
              color: 'white',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {editAbout ? 'Edit About' : 'Create About'}
            </Typography>
            <IconButton onClick={handleCloseModal} sx={{ color: 'white' }}>
              <Close />
            </IconButton>
          </Box>

          {/* Modal Body */}
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
            <form id="aboutForm" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Slug 1"
                    name="slug1"
                    value={formData.slug1}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Slug 2"
                    name="slug2"
                    value={formData.slug2}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Paragraph 1"
                    name="par1"
                    value={formData.par1}
                    onChange={handleInputChange}
                    multiline
                    rows={3}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Paragraph 2"
                    name="par2"
                    value={formData.par2}
                    onChange={handleInputChange}
                    multiline
                    rows={3}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Link"
                    name="link"
                    value={formData.link}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                    LIST ITEMS (MAX 10)
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={handleAddListItem}
                    fullWidth
                    startIcon={<Add />}
                    disabled={listItems.length >= 10}
                  >
                    Add List Item
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
                    {listItems.map((item, index) => (
                      <Box
                        key={index}
                        sx={{
                          position: 'relative',
                          border: '1px solid',
                          borderColor: 'divider',
                          borderRadius: 1,
                          p: 0.5,
                        }}
                        onClick={() => handleOpenListItemModal(index, item)} // Open modal for editing
                      >
                        <TextField
                          fullWidth
                          value={item}
                          
                          placeholder={`Item ${index + 1}`}
                          variant="outlined"
                          sx={{ width: 200, cursor: 'pointer' }}
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
                            e.stopPropagation(); // Prevent modal from opening on delete
                            handleRemoveListItem(index);
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
                    {listItems.length}/10 items selected
                  </Typography>

                  {/* Modal for editing list item */}
                  <Modal open={listItemModalOpen} onClose={handleCloseListItemModal}>
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: { xs: '90%', sm: 400 },
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 3,
                      }}
                    >
                      <Typography variant="h6" sx={{ mb: 2 }}>
                        Edit List Item
                      </Typography>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        value={selectedListItem.value}
                        onChange={(e) =>
                          setSelectedListItem({ ...selectedListItem, value: e.target.value })
                        }
                        variant="outlined"
                      />
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 2 }}>
                        <Button variant="outlined" onClick={handleCloseListItemModal}>
                          Cancel
                        </Button>
                        <Button variant="contained" onClick={handleListItemModalSave}>
                          Save
                        </Button>
                      </Box>
                    </Box>
                  </Modal>
                </Grid>


                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      border: '1px dashed',
                      borderColor: 'divider',
                      borderRadius: 1,
                      p: 2,
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                      IMAGE 1 UPLOAD
                    </Typography>
                    <Button
                      variant="outlined"
                      component="label"
                      fullWidth
                      startIcon={<Add />}
                    >
                      Upload Image 1
                      <input type="file" hidden onChange={(e) => handleImageChange(e, 'img1')} />
                    </Button>
                    {img1Preview && (
                      <Box mt={2} sx={{ position: 'relative' }}>
                        <img
                          src={img1Preview}
                          alt="Preview 1"
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
                            setFormData((prev) => ({ ...prev, img1: null }));
                            setImg1Preview(null);
                          }}
                        >
                          <Close fontSize="small" />
                        </IconButton>
                      </Box>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      border: '1px dashed',
                      borderColor: 'divider',
                      borderRadius: 1,
                      p: 2,
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                      IMAGE 2 UPLOAD
                    </Typography>
                    <Button
                      variant="outlined"
                      component="label"
                      fullWidth
                      startIcon={<Add />}
                    >
                      Upload Image 2
                      <input type="file" hidden onChange={(e) => handleImageChange(e, 'img2')} />
                    </Button>
                    {img2Preview && (
                      <Box mt={2} sx={{ position: 'relative' }}>
                        <img
                          src={img2Preview}
                          alt="Preview 2"
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
                            setFormData((prev) => ({ ...prev, img2: null }));
                            setImg2Preview(null);
                          }}
                        >
                          <Close fontSize="small" />
                        </IconButton>
                      </Box>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Box>

          {/* Modal Footer */}
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
              form="aboutForm"
              variant="contained"
              color="primary"
              startIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : editAbout ? <Edit /> : <Add />}
              disabled={isSubmitting}
            >
               {isSubmitting ? 'Submitting...' : editAbout ? 'Update' : 'Create'}
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
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>


      {/* Dialog for Delete Confirmation */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this about entry?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="contained" color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AboutsTable;