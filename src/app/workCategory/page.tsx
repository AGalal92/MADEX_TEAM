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
  useTheme,
  Chip,
  Snackbar,
  Alert,
  CircularProgress,
  AlertColor
} from '@mui/material';
import { Edit, Delete, Add, Close } from '@mui/icons-material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
const WorkCategoriesTable = () => {
  const router = useRouter();
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      router.push('/');
    }
  }, [router]);
  const [categories, setCategories] = useState([]);
  const [editCategory, setEditCategory] = useState(null);
  const [formData, setFormData] = useState({ category: '', title: '' });
  const [modalOpen, setModalOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');
  const [isSubmitting, setIsSubmitting] = useState(false);


  const API_BASE_URL = 'http://localhost:5001/api/work-categories'; // Replace with your backend URL
  const theme = useTheme();

  const fetchCategories = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      showSnackbar('Error fetching data.', 'error');

    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOpenModal = (category = null) => {
    setEditCategory(category);
    setFormData(category ? { category: category.category, title: category.title } : { category: '', title: '' });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditCategory(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editCategory) {
        await axios.put(`${API_BASE_URL}/${editCategory._id}`, formData);
      } else {
        await axios.post(API_BASE_URL, formData);
      }
      fetchCategories();
      handleCloseModal();
      showSnackbar('Category saved successfully!', 'success');
    } catch (error) {
      console.error('Error saving category:', error);
      showSnackbar('Error saving category.', 'error');
    } finally {
      setIsSubmitting(false);
    }
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
      fetchCategories();
      handleCloseDialog();
      showSnackbar('Category deleted successfully!', 'success');
    } catch (error) {
      console.error('Error deleting category:', error);
      showSnackbar('Error deleting category.', 'error');
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
          Work Categories
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
                <TableCell sx={{ color: theme.palette.common.white, fontWeight: 'bold' }}>Category</TableCell>
                <TableCell sx={{ color: theme.palette.common.white, fontWeight: 'bold' }}>Title</TableCell>
                <TableCell sx={{ color: theme.palette.common.white, fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category._id} sx={{ '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover } }}>
                  <TableCell>{category.category}</TableCell>
                  <TableCell>{category.title}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleOpenModal(category)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleOpenDialog(category._id)}>
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
              width: 500,
              bgcolor: 'background.paper',
              borderRadius: 2,
              p: 3,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              {editCategory ? 'Edit Category' : 'Create Category'}
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                sx={{ mb: 2 }}
              />
              <Box display="flex" justifyContent="flex-end" gap={2}>
                <Button onClick={handleCloseModal} variant="outlined" color="inherit" startIcon={<Close />}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary" startIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : editCategory ? <Edit /> : <Add />}
                  disabled={isSubmitting}      >
                  {isSubmitting ? 'Submitting...' : editCategory ? 'Update' : 'Create'}

                </Button>
              </Box>
            </form>
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
            <DialogContentText>Are you sure you want to delete this category?</DialogContentText>
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

export default WorkCategoriesTable;
