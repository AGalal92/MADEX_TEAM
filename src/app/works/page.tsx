'use client';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Chip,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Edit, Delete, Add, Close } from '@mui/icons-material';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const WorksTable = () => {
  const router = useRouter();
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      router.push('/');
    }
  }, [router]);
  const [works, setWorks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editWork, setEditWork] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    work_category_id: '',
  });
  const [files, setFiles] = useState({
    image: null,
    video: null,
    image_before: null,
    image_after: null,
    slider_images: [],
  });
  const [previews, setPreviews] = useState({
    image: null,
    video: null,
    image_before: null,
    image_after: null,
    slider_images: [],
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [sliderImages, setSliderImages] = useState([]); // Manage slider images as files
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "warning" | "info">('success');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleAddSliderImage = (file) => {
    if (sliderImages.length >= 10) {
      alert('You can upload a maximum of 10 slider images.');
      return;
    }
    setSliderImages([...sliderImages, file]);
  };
  const handleUpdateSliderImage = (index, file) => {
    const updatedImages = [...sliderImages];
    updatedImages[index] = file;
    setSliderImages(updatedImages);
  };
  const handleRemoveSliderImage = (index) => {
    const updatedImages = sliderImages.filter((_, i) => i !== index);
    setSliderImages(updatedImages);
  };
  const handleSliderChange = (e) => {
    const newFiles = Array.from(e.target.files);
    newFiles.forEach((file) => {
      handleAddSliderImage(file); // Add each new file to the sliderImages state
    });
  };

  const API_BASE_URL = 'http://localhost:5001/api/works';
  const CATEGORIES_URL = 'http://localhost:5001/api/work-categories';
  const STORAGE_BASE_URL = 'http://localhost:5001/storage';

  const theme = useTheme();

  const fetchWorks = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setWorks(response.data);
    } catch (error) {
      console.error('Error fetching works:', error);
      showSnackbar('Error fetching data.', 'error');
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(CATEGORIES_URL);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchWorks();
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e, field) => {
    const newFiles = e.target.files;
    if (!newFiles) return;

    if (field === 'slider_images') {
      const filesArray = Array.from(newFiles);
      setFiles(prev => ({
        ...prev,
        [field]: [...prev[field], ...filesArray]
      }));

      // Create previews for new files
      filesArray.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviews(prev => ({
            ...prev,
            slider_images: [...prev.slider_images, e.target.result]
          }));
        };
        reader.readAsDataURL(file as any);
      });
    } else {
      const file = newFiles[0];
      setFiles(prev => ({ ...prev, [field]: file }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviews(prev => ({ ...prev, [field]: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeSliderImage = (index) => {
    setFiles(prev => ({
      ...prev,
      slider_images: prev.slider_images.filter((_, i) => i !== index)
    }));
    setPreviews(prev => ({
      ...prev,
      slider_images: prev.slider_images.filter((_, i) => i !== index)
    }));
  };

  const handleOpenModal = (work = null) => {
    setEditWork(work);
    if (work) {
      setFormData({
        title: work.title,
        slug: work.slug,
        work_category_id: work.work_category_id ? work.work_category_id._id : '', // ✅ Ensure it's an ID
      });
      setPreviews({
        image: work.image ? `${STORAGE_BASE_URL}/${work.image}` : null,
        video: work.video ? `${STORAGE_BASE_URL}/${work.video}` : null,
        image_before: work.image_before ? `${STORAGE_BASE_URL}/${work.image_before}` : null,
        image_after: work.image_after ? `${STORAGE_BASE_URL}/${work.image_after}` : null,
        slider_images: work.slider_images.map(img => `${STORAGE_BASE_URL}/${img}`),
      });

      // Initialize sliderImages with existing images from the backend
      setSliderImages(work.slider_images || []);
    } else {
      setFormData({
        title: '',
        slug: '',
        work_category_id: '',
      });
      setPreviews({
        image: null,
        video: null,
        image_before: null,
        image_after: null,
        slider_images: [],
      });
      setSliderImages([]); // Reset sliderImages for new entries
    }
    setFiles({
      image: null,
      video: null,
      image_before: null,
      image_after: null,
      slider_images: [],
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const data = new FormData();

    // Append form fields from formData state
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    // Append sliderImages as an array under the single key 'slider_images'
    if (sliderImages.length > 0) {
      sliderImages.forEach((file) => {
        data.append('slider_images', file); // Append each file with the same key
      });
    }

    // Append other individual file inputs (image, video, imageBefore, imageAfter)
    ['image', 'video', 'image_before', 'image_after'].forEach((field) => {
      if (files[field]) {
        data.append(field, files[field]); // Append single file for each field
      }
    });

    try {
      if (editWork) {
        // Update existing work
        await axios.put(`${API_BASE_URL}/${editWork._id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        showSnackbar('Works updated successfully!', 'success');
      } else {
        // Create new work
        await axios.post(API_BASE_URL, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        showSnackbar('Works created successfully!', 'success');
      }

      // Refresh works data and close modal
      fetchWorks();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving work:', error);
      alert('An error occurred while saving the work. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };





  const handleCloseModal = () => {
    setModalOpen(false);
    setEditWork(null);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/${deleteId}`);
      fetchWorks();
      setDialogOpen(false);
      showSnackbar('Work deleted successfully!', 'success');
    } catch (error) {
      console.error('Error deleting work:', error);
      showSnackbar('Failed to delete work.', 'error');
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
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Works Table</Typography>
        <Box display="flex" justifyContent="flex-end" mb={4}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => handleOpenModal()}
          >
            Create Work
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ bgcolor: theme.palette.primary.main }}>
              <TableRow>
                <TableCell sx={{ color: 'white' }}>Title</TableCell>
                <TableCell sx={{ color: 'white' }}>Slug</TableCell>
                <TableCell sx={{ color: 'white' }}>Category</TableCell>
                <TableCell sx={{ color: 'white' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {works.map((work) => (
                <TableRow key={work._id} sx={{ '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover } }}>
                  <TableCell>{work.title}</TableCell>
                  <TableCell>{work.slug}</TableCell>
                  <TableCell>
                    {categories.find(c => c._id === work.work_category_id)?.category}
                  </TableCell>
                  <TableCell>
                    <IconButton  color="primary" onClick={() => handleOpenModal(work)}>
                      <Edit />
                    </IconButton>
                    <IconButton  color="secondary" onClick={() => { setDeleteId(work._id); setDialogOpen(true); }}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Create/Edit Modal */}
        <Modal open={modalOpen} onClose={handleCloseModal}>
          <Box sx={{
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
            
          }}>
            {/* Header */}
            <Box sx={{
              p: 3,
              borderBottom: 1,
              borderColor: 'divider',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              bgcolor: theme.palette.primary.main,
              color: 'white',
            }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {editWork ? 'Edit Work Entry' : 'Create New Work'}
              </Typography>
              <IconButton onClick={handleCloseModal} sx={{ color: 'white' }}>
                <Close />
              </IconButton>
            </Box>

            {/* Scrollable Content */}
            <Box sx={{
              p: 3,
              overflowY: 'auto',
              flex: 1,
              '&::-webkit-scrollbar': { width: '6px' },
              '&::-webkit-scrollbar-track': { bgcolor: '#f5f5f5' },
              '&::-webkit-scrollbar-thumb': { bgcolor: '#ddd', borderRadius: '4px' },
            }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  {/* Text Fields */}
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
                      label="Slug"
                      name="slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Category</InputLabel>
                      <Select
                        name="work_category_id"
                        value={formData.work_category_id}
                        onChange={handleInputChange}
                        required
                        label="Category"
                      >
                        {categories.map(category => (
                          <MenuItem key={category._id} value={category._id}>
                            {category.category}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Main Media Uploads */}
                  {['image', 'video', 'image_before', 'image_after'].map((field) => (
                    <Grid item xs={6} key={field}>
                      <Box sx={{
                        border: '1px dashed',
                        borderColor: 'divider',
                        borderRadius: 1,
                        p: 2,
                        height: '100%'
                      }}>
                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                          {field.replace(/_/g, ' ').toUpperCase()}
                        </Typography>
                        <Button
                          variant="outlined"
                          component="label"
                          fullWidth
                          startIcon={<Add />}
                        >
                          Upload {field.replace(/_/g, ' ')}
                          <input
                            type="file"
                            hidden
                            onChange={(e) => handleFileChange(e, field)}
                            accept={field === 'video' ? 'video/*' : 'image/*'}
                          />
                        </Button>
                        {previews[field] && (
                          <Box mt={2} sx={{ position: 'relative' }}>
                            {field === 'video' ? (
                              <video
                                controls
                                src={previews[field]}
                                style={{
                                  borderRadius: 4,
                                  objectFit: 'cover'
                                }}
                              />
                            ) : (
                              <Image
                                src={previews[field]}
                                alt={field}
                                width={500} // Replace with your image's width
                                height={300} // Replace with your image's height
                                style={{
                                  width: '100%',
                                  borderRadius: 4,
                                  maxHeight: 200,
                                  objectFit: 'cover'
                                }}
                              />
                            )}
                            {files[field] && (
                              <IconButton
                                size="small"
                                sx={{
                                  position: 'absolute',
                                  top: 4,
                                  right: 4,
                                  bgcolor: 'background.paper',
                                  '&:hover': { bgcolor: 'error.light' }
                                }}
                                onClick={() => {
                                  setFiles(prev => ({ ...prev, [field]: null }));
                                  setPreviews(prev => ({ ...prev, [field]: null }));
                                }}
                              >
                                <Close fontSize="small" />
                              </IconButton>
                            )}
                          </Box>
                        )}
                      </Box>
                    </Grid>
                  ))}

                  {/* Slider Images Section */}
                  <Grid item xs={12}>
                    <Box sx={{
                      border: '1px dashed',
                      borderColor: 'divider',
                      borderRadius: 1,
                      p: 2,
                    }}>
                      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                        SLIDER IMAGES (MAX 10)
                      </Typography>
                      <Button
                        variant="outlined"
                        component="label"
                        startIcon={<Add />}
                        fullWidth
                        disabled={sliderImages.length >= 10}
                      >
                        Add Slider Images
                        <input
                          type="file"
                          hidden
                          multiple
                          onChange={handleSliderChange}
                          accept="image/*"
                        />
                      </Button>
                      <Box sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 2,
                        mt: 2,
                        maxHeight: 300,
                        overflowY: 'auto',
                        p: 1
                      }}>
                        {sliderImages.map((item, index) => {
                          // Determine if the item is a File (new upload) or string (existing image)
                          const isFile = item instanceof File;
                          const imageUrl = isFile ?
                            URL.createObjectURL(item) : // Preview for newly uploaded files
                            `${STORAGE_BASE_URL}/${item}`; // URL for existing images from the backend

                          return (
                            <Box
                              key={index}
                              sx={{
                                position: 'relative',
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 1,
                                p: 0.5
                              }}
                            >
                              <Image
                                src={imageUrl}
                                alt={`Slider ${index}`}
                                width={500} // Replace with your image's width
                                height={300} // Replace with your image's height
                                style={{
                                  width: 100,
                                  height: 100,
                                  objectFit: 'cover',
                                  borderRadius: 4
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
                                  '&:hover': { bgcolor: 'error.light' }
                                }}
                                onClick={() => handleRemoveSliderImage(index)}
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
                                  color: 'white'
                                }}
                              />
                              {!isFile && (
                                <Chip
                                  label="Existing"
                                  size="small"
                                  sx={{
                                    position: 'absolute',
                                    top: 4,
                                    left: 4,
                                    bgcolor: 'primary.main',
                                    color: 'white'
                                  }}
                                />
                              )}
                            </Box>
                          );
                        })}
                      </Box>
                      <Typography variant="caption" sx={{ mt: 1, display: 'block', textAlign: 'center' }}>
                        {sliderImages.length}/10 images selected
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </Box>

            {/* Footer */}
            <Box sx={{
              p: 2,
              borderTop: 1,
              borderColor: 'divider',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 2
            }}>
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
                variant="contained"
                color="primary"
                startIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : editWork ? <Edit /> : <Add />}
                disabled={isSubmitting}
                onClick={handleSubmit}
              >
                {isSubmitting ? 'Submitting...' : editWork ? 'Update' : 'Create'}

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

        {/* Delete Dialog */}
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this work?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleDelete} color="error">Delete</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </DefaultLayout>
  );
};

export default WorksTable;
