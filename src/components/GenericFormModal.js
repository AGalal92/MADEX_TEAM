import React from 'react';
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
  Fade, // Import Fade for animation
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

const GenericFormModal = ({
  open,
  onClose,
  onSubmit,
  formValues,
  setFormValues,
  fields,
  title,
}) => {
  const handleChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (event, field) => {
    const file = event.target.files[0];
    if (file) {
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

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md" // Wider modal
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          maxHeight: '80vh', // Set maximum height
          height: '100%', // Ensure it takes full height within the limit
        },
      }}
      TransitionComponent={Fade} // Use Fade for animation
      transitionDuration={300} // Set animation duration (in milliseconds)
    >
      {/* Header */}
      <DialogTitle
        sx={{
          backgroundColor: '#f5f5f5',
          borderBottom: '1px solid #e0e0e0',
          py: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
      </DialogTitle>

      {/* Content */}
      <DialogContent sx={{ marginTop: 4,py: 2, overflowY: 'auto' }}>
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
                sx={{ mb: 1 }}
              />
            </Grid>
          ))}
        </Grid>

        {/* Divider and Images Section */}
        {imageFields.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
              Images
            </Typography>
            <Grid container spacing={2}>
              {imageFields.map((field) => (
                <Grid item xs={6} key={field.name}> {/* Two images per row */}
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
          backgroundColor: '#f5f5f5',
          borderTop: '1px solid #e0e0e0',
          py: 2,
          px: 3,
        }}
      >
        <Button onClick={onClose} color="secondary" variant="outlined" size="small">
          Cancel
        </Button>
        <Button onClick={onSubmit} color="primary" variant="contained" size="small">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GenericFormModal;