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
} from '@mui/material';
import { Delete, Visibility, Close } from '@mui/icons-material';
import axios from 'axios';

const ContactUsTable = () => {
  const [contacts, setContacts] = useState([]);
  const [viewContact, setViewContact] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('success');
  const [isSubmitting, setIsSubmitting] = useState(false);


  const API_BASE_URL = 'http://localhost:5001/api/contact-us'; // Replace with your backend API URL
  const theme = useTheme();

  const fetchContacts = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      showSnackbar('Error fetching data.', 'error');

    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleViewContact = (contact) => {
    setViewContact(contact);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setViewContact(null);
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
      fetchContacts();
      handleCloseDialog();
      showSnackbar('Contact message deleted successfully.', 'success');
    } catch (error) {
      console.error('Error deleting contact message:', error);
      showSnackbar('Error deleting contact message.', 'error');
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
          Contact Messages
        </Typography>

        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3, mt: 4 }}>
          <Table>
            <TableHead sx={{ backgroundColor: theme.palette.primary.main }}>
              <TableRow>
                <TableCell sx={{ color: theme.palette.common.white, fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ color: theme.palette.common.white, fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ color: theme.palette.common.white, fontWeight: 'bold' }}>Subject</TableCell>
                <TableCell sx={{ color: theme.palette.common.white, fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover } }}>
                  <TableCell>{contact.name}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.subject}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleViewContact(contact)}>
                      <Visibility />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleOpenDialog(contact.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Modal for Viewing Contact */}
        <Modal open={modalOpen} onClose={handleCloseModal}>
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 600,
      maxWidth: '90vw',
      bgcolor: 'background.paper',
      borderRadius: 3,
      boxShadow: 24,
      overflow: 'hidden',
    }}
  >
    {/* Modal Header */}
    <Box
      sx={{
        bgcolor: theme.palette.primary.main,
        color: theme.palette.common.white,
        p: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        Contact Details
      </Typography>
      <IconButton onClick={handleCloseModal} sx={{ color: theme.palette.common.white }}>
        <Close />
      </IconButton>
    </Box>

    {/* Modal Body */}
    <Box sx={{ p: 3 }}>
      {viewContact && (
        <>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              rowGap: 2,
              columnGap: 2,
            }}
          >
            {/* Name Field */}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 500, mb: 0.5 }}>
                Name
              </Typography>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  backgroundColor: theme.palette.background.default,
                  fontSize: '1rem',
                  fontWeight: 500,
                }}
              >
                {viewContact.name}
              </Box>
            </Box>

            {/* Email Field */}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 500, mb: 0.5 }}>
                Email
              </Typography>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  backgroundColor: theme.palette.background.default,
                  wordBreak: 'break-word',
                  fontSize: '1rem',
                  fontWeight: 500,
                }}
              >
                {viewContact.email}
              </Box>
            </Box>

            {/* Subject Field */}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 500, mb: 0.5 }}>
                Subject
              </Typography>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  backgroundColor: theme.palette.background.default,
                  fontSize: '1rem',
                  fontWeight: 500,
                }}
              >
                {viewContact.subject}
              </Box>
            </Box>

            {/* Message Field */}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 500, mb: 0.5 }}>
                Message
              </Typography>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  backgroundColor: theme.palette.action.hover,
                  fontSize: '1rem',
                  fontWeight: 500,
                  lineHeight: 1.5,
                  wordBreak: 'break-word',
                  minHeight: 100,
                }}
              >
                {viewContact.message}
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>

    {/* Modal Footer */}
    <Box
      sx={{
        p: 2,
        bgcolor: theme.palette.grey[100],
        display: 'flex',
        justifyContent: 'flex-end',
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Button
        onClick={handleCloseModal}
        variant="contained"
        sx={{
          textTransform: 'none',
          fontWeight: 'bold',
          bgcolor: theme.palette.error.main,
          '&:hover': { bgcolor: theme.palette.error.dark },
        }}
        startIcon={<Close />}
      >
        Close
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
            <DialogContentText>Are you sure you want to delete this contact message?</DialogContentText>
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

export default ContactUsTable;
