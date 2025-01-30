'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { Snackbar, Alert } from '@mui/material';

export default function Contact({contact}) {
  const contactData = {
    sectionTitle: {
      title: "Contact",
      description: "To Reach Us",
    },
    contactInfo: [
      {
        icon: "bi bi-geo-alt",
        title: "Address",
        description: "A108 Adam Street, New York, NY 535022",
      },
      {
        icon: "bi bi-telephone",
        title: "Call Us",
        description: "+1 5589 55488 55",
      },
      {
        icon: "bi bi-envelope",
        title: "Email Us",
        description: "info@example.com",
      },
    ],
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' or 'error'

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5001/api/contact-us', formData);

      if (response.data && response.data.message === "Contact message created successfully!") {
        setSnackbarMessage('Your message reached us. We will contact you ASAP.');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
      } else {
        setSnackbarMessage('Unexpected response. Please try again.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      setSnackbarMessage('An error occurred. Please try again later.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <section id="contact" className="contact section dark-background">
      <div className="container section-title" data-aos="fade-up">
        <h2>{contactData.sectionTitle.title}</h2>
        <p>{contactData.sectionTitle.description}</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4">
          <div className="col-lg-6">
            <div className="row gy-4">
              {contactData.contactInfo.map((info, index) => (
                <div key={index} className={`col-lg-${index === 0 ? "12" : "6"}`}>
                  <div className="info-item d-flex flex-column justify-content-center align-items-center" data-aos="fade-up" data-aos-delay={`${200 + index * 100}`}>
                    <i className={info.icon}></i>
                    <h3>{info.title}</h3>
                    <p>{info.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-6">
            <form onSubmit={handleSubmit} className="php-email-form" data-aos="fade-up" data-aos-delay="500">
              <div className="row gy-4">
                <div className="col-md-6">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Your Email"
                    required
                  />
                </div>
                <div className="col-md-12">
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Subject"
                    required
                  />
                </div>
                <div className="col-md-12">
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Message"
                    required
                  ></textarea>
                </div>
                <div className="col-md-12 text-center">
                  <button type="submit" className="btn" style={{ backgroundColor: '#ffc107', color: '#000' }}>
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Snackbar for success/error message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </section>
  );
}
