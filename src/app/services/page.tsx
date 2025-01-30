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
import Image from 'next/image';


const ServicesTable = () => {
  const [services, setServices] = useState([]);
  const [editService, setEditService] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    icon: '',
    heading: '',
    description: '',
    paragraph: '',
    image: null,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [listItems, setListItems] = useState([]); // For managing list items
  const [editListItemModalOpen, setEditListItemModalOpen] = useState(false); // Modal for editing list items
  const [currentListItemIndex, setCurrentListItemIndex] = useState(null); // Index of the list item being edited
  const [currentListItemText, setCurrentListItemText] = useState(''); // Text of the list item being edited
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API_BASE_URL = 'http://localhost:5001/api/services'; // Replace with your backend URL
  const STORAGE_BASE_URL = 'http://localhost:5001/storage'; // Replace with your backend URL

  const theme = useTheme();

  const fetchServices = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      const services = response.data.map((service) => ({
        ...service,
        list_items: (() => {
          try {
            return Array.isArray(service.list_items)
              ? service.list_items
              : JSON.parse(service.list_items || '[]');
          } catch (err) {
            console.error('Error parsing list_items:', err);
            return [];
          }
        })(),
      }));

      setServices(services);
    } catch (error) {
      console.error('Error fetching services:', error);
      showSnackbar('Error fetching data.', 'error');
    }
  };

  useEffect(() => {
    fetchServices();
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

  const handleListItemChange = (index, value) => {
    const updatedListItems = [...listItems];
    updatedListItems[index] = value;
    setListItems(updatedListItems);
  };

  const handleAddListItem = () => {
    setListItems([...listItems, '']);
  };

  const handleRemoveListItem = (index) => {
    const updatedListItems = listItems.filter((_, i) => i !== index);
    setListItems(updatedListItems);
  };

  const handleOpenEditListItemModal = (index) => {
    setCurrentListItemIndex(index);
    setCurrentListItemText(listItems[index]);
    setEditListItemModalOpen(true);
  };

  const handleCloseEditListItemModal = () => {
    setEditListItemModalOpen(false);
    setCurrentListItemIndex(null);
    setCurrentListItemText('');
  };

  const handleSaveListItem = () => {
    if (currentListItemIndex !== null) {
      handleListItemChange(currentListItemIndex, currentListItemText);
    }
    handleCloseEditListItemModal();
  };

  const handleOpenModal = (service = null) => {
    setEditService(service);
    if (service) {
      setFormData({
        title: service.title,
        icon: service.icon,
        heading: service.heading,
        description: service.description,
        paragraph: service.paragraph,
        image: null, // Reset the image file for editing
      });
      setListItems(service.list_items || []);
      setImagePreview(service.image ? `${STORAGE_BASE_URL}/${service.image}` : null);
    } else {
      setFormData({
        title: '',
        icon: '',
        heading: '',
        description: '',
        paragraph: '',
        image: null,
      });
      setListItems([]);
      setImagePreview(null);
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditService(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const data = new FormData();
    data.append('title', formData.title);
    data.append('icon', formData.icon);
    data.append('heading', formData.heading);
    data.append('description', formData.description);
    data.append('paragraph', formData.paragraph);
    data.append('list_items', JSON.stringify(listItems)); // Pass as JSON array

    if (formData.image instanceof File) {
      data.append('image', formData.image);
    }

    try {
      if (editService) {
        await axios.put(`${API_BASE_URL}/${editService.id}`, data);
      } else {
        await axios.post(API_BASE_URL, data);
      }
      fetchServices();
      handleCloseModal();
      showSnackbar('successfully!', 'success');
    } catch (error) {
      console.error('Error saving service:', error);
      showSnackbar('successfully!', 'success');

    } finally {
      setIsSubmitting(false);
  };
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
      fetchServices();
      handleCloseDialog();
      showSnackbar('Service deleted successfully.','success');
    } catch (error) {
      console.error('Error deleting service:', error);
      showSnackbar('Error deleting service.', 'error');
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
          Services Table
        </Typography>
        <Box display="flex" justifyContent="flex-end" mb={4}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => handleOpenModal()}
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
                <TableCell sx={{ color: theme.palette.common.white, fontWeight: 'bold' }}>Heading</TableCell>
                <TableCell sx={{ color: theme.palette.common.white, fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover } }}>
                  <TableCell>{service.title}</TableCell>
                  <TableCell>{service.heading}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleOpenModal(service)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleOpenDialog(service.id)}>
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
                bgcolor: theme.palette.primary.main,
                color: 'white',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {editService ? 'Edit Service' : 'Create Service'}
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
              <form id="serviceForm" onSubmit={handleSubmit}>
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
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Icon"
                      name="icon"
                      value={formData.icon}
                      onChange={handleInputChange}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Heading"
                      name="heading"
                      value={formData.heading}
                      onChange={handleInputChange}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      multiline
                      rows={3}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Paragraph"
                      name="paragraph"
                      value={formData.paragraph}
                      onChange={handleInputChange}
                      multiline
                      rows={3}
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
                              cursor: 'pointer',
                            }}
                            onClick={() => handleOpenEditListItemModal(index)}
                          >
                            <TextField
                              fullWidth
                              value={item}
                              placeholder={`Item ${index + 1}`}
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
                form="serviceForm"
                variant="contained"
                color="primary"
                startIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : editService ? <Edit /> : <Add />}
                disabled={isSubmitting}
               
              >
                 {isSubmitting ? 'Submitting...' : editService ? 'Update' : 'Create'}

              </Button>
            </Box>
          </Box>
        </Modal>

        {/* Modal for Editing List Items */}
        <Modal open={editListItemModalOpen} onClose={handleCloseEditListItemModal}>
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
              Edit List Item
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={currentListItemText}
              onChange={(e) => setCurrentListItemText(e.target.value)}
              variant="outlined"
            />
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                onClick={handleCloseEditListItemModal}
                variant="outlined"
                color="inherit"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveListItem}
                variant="contained"
                color="primary"
              >
                Save
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
              Are you sure you want to delete this service entry?
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
    </DefaultLayout>
  );
};

export default ServicesTable;