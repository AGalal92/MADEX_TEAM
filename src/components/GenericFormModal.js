import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Box,
  Typography,
  Grid,
  Divider,
  Slide, // Import Slide for animation
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

// Slide-up transition for opening the modal
const TransitionUp = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const GenericFormModal = ({
  open,
  onClose,
  onSubmit,
  formValues,
  setFormValues,
  fields,
  title,
}) => {
  const [isOpen, setIsOpen] = useState(open); // Local state to control modal visibility

  // Sync the local state with the `open` prop
  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (event, field) => {
    const file = event.target.files[0];
    if (file) {
      // Check file size (e.g., 5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB.');
        return;
      }
  
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange(field, reader.result); // Update the image in formValues
      };
      reader.readAsDataURL(file);
    }
  };
  

  // Fields to exclude
  const excludedFields = ['id', 'updated_at', 'created_at'];

  // Separate image fields from other fields and exclude unwanted fields
  const textFields = fields.filter(
    (field) => field.type !== 'image' && !excludedFields.includes(field.name)
  );
  const imageFields = fields.filter(
    (field) => field.type === 'image' && !excludedFields.includes(field.name)
  );

  // Handle modal close with animation
  const handleClose = () => {
    setIsOpen(false); // Start closing animation
    setTimeout(() => {
      onClose(); // Call the parent's onClose after animation completes
    }, 300); // Match the duration of the slide animation
  };

  // Dark mode colors
  const darkBackground = 'rgb(36, 48, 63)'; // Base dark color
  const lighterBackground = 'rgb(45, 57, 72)'; // Lighter variation
  const textColor = 'rgba(255, 255, 255, 0.87)'; // Light text for dark mode

  return (
    <Dialog
      open={isOpen} // Use local state for open
      onClose={handleClose} // Use the custom handleClose function
      maxWidth="md" // Wider modal
      fullWidth
      TransitionComponent={TransitionUp} // Use Slide for animation
      transitionDuration={300} // Set animation duration (in milliseconds)
      sx={{
        '& .MuiDialog-paper': {
          maxHeight: '80vh', // Set maximum height
          height: '100%', // Ensure it takes full height within the limit
          borderRadius: '12px', // Rounded corners
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', // Soft shadow
          backgroundColor: darkBackground, // Dark background for the modal
          color: textColor, // Light text for dark mode
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          backgroundColor: lighterBackground, // Lighter background for header
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)', // Light border for dark mode
          py: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
      </DialogTitle>

      {/* Content */}
      <DialogContent sx={{ py: 2,marginTop: 4, overflowY: 'auto' }}>
        {/* Text Fields */}
        <Grid container spacing={2}>
          {textFields.map((field, index) => (
            <Grid item xs={6} key={field.name}>
              <TextField
                margin="dense"
                label={field.label}
                fullWidth
                value={formValues[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                size="small"
                sx={{
                  mb: 1,
                  '& .MuiInputBase-input': {
                    color: textColor, // Light text for dark mode
                  },
                  '& .MuiInputLabel-root': {
                    color: textColor, // Light label text for dark mode
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.23)', // Light border for dark mode
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.5)', // Light border on hover
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.87)', // Light border when focused
                    },
                  },
                }}
              />
            </Grid>
          ))}
        </Grid>

        {/* Divider and Images Section */}
        {imageFields.length > 0 && (
          <>
            <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.12)' }} /> {/* Light border for dark mode */}
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
              Images
            </Typography>
            <Grid container spacing={2}>
              {imageFields.map((field) => (
                <Grid item xs={6} key={field.name}>
                  <Box sx={{ mt: 1, mb: 1 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      {field.label}
                    </Typography>
                    {formValues[field.name] && (
                      <Box
                        component="img"
                        src={formValues[field.name]}
                        alt="Preview"
                        sx={{
                          width: '100%',
                          maxHeight: '150px',
                          objectFit: 'cover',
                          borderRadius: '4px',
                          mb: 1,
                        }}
                      />
                    )}
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id={`image-upload-${field.name}`}
                      type="file"
                      onChange={(e) => handleImageChange(e, field.name)}
                    />
                    <label htmlFor={`image-upload-${field.name}`}>
                      <Button
                        variant="outlined"
                        component="span"
                        startIcon={<CloudUpload />}
                        size="small"
                        fullWidth
                        sx={{
                          color: textColor, // Light text for dark mode
                          borderColor: 'rgba(255, 255, 255, 0.23)', // Light border for dark mode
                          '&:hover': {
                            borderColor: 'rgba(255, 255, 255, 0.5)', // Light border on hover
                          },
                        }}
                      >
                        Upload Image
                      </Button>
                    </label>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </DialogContent>

      {/* Footer */}
      <DialogActions
        sx={{
          backgroundColor: lighterBackground, // Lighter background for footer
          borderTop: '1px solid rgba(255, 255, 255, 0.12)', // Light border for dark mode
          py: 2,
          px: 3,
        }}
      >
        <Button
          onClick={handleClose}
          color="secondary"
          variant="outlined"
          size="small"
          sx={{ borderRadius: '8px', color: textColor, borderColor: 'rgba(255, 255, 255, 0.23)' }} // Light text and border for dark mode
        >
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          color="primary"
          variant="contained"
          size="small"
          sx={{ borderRadius: '8px' }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GenericFormModal;