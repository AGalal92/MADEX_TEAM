'use client'; // Mark as a client component for interactivity

import { useState } from 'react';
import Image from 'next/image';
import { Modal, Box, Tooltip } from '@mui/material';
import { PlayCircleOutline, Link } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Portfolio({ category, project }) {
  const [activeFilter, setActiveFilter] = useState('*'); // State for the active filter
  const [videoModalOpen, setVideoModalOpen] = useState(false); // Modal state for video
  const [currentVideo, setCurrentVideo] = useState(''); // Current video to display
  const router = useRouter();

  const STORAGE_BASE_URL = 'http://localhost:5001/storage'; // Base URL for images and videos

  if (!category || !project || category.length === 0 || project.length === 0) {
    return <p>Loading...</p>; // Display a loading state if no data is passed
  }

  // Get unique category IDs from the project
  const projectCategoryIds = [...new Set(project.map((proj) => proj.categoryId))];

  // Filter categories to only include those that are present in the project data
  const filteredCategories = category.filter((cat) =>
    projectCategoryIds.includes(cat.id)
  );

  // Filter works based on the active filter
  const filteredWorks =
    activeFilter === '*'
      ? project
      : project.filter((work) => work.categoryId.toString() === activeFilter);

  // Open video modal
  const handleOpenVideoModal = (video) => {
    setCurrentVideo(`${STORAGE_BASE_URL}/${video}`);
    setVideoModalOpen(true);
  };

  // Close video modal
  const handleCloseVideoModal = () => {
    setVideoModalOpen(false);
    setCurrentVideo('');
  };

  const scrollStyle = `
    ::-webkit-scrollbar {
      width: 4px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #ffc107;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-track {
      background-color: #000;
    }
  `;

  return (
    <>
       <style>{scrollStyle}</style>
    <section id="portfolio" className="portfolio section dark-background">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Portfolio</h2>
        <p>CHECK OUR PORTFOLIO</p>
      </div>

      {/* Portfolio Filters and Items */}
      <div className="container">
        <div className="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">
          {/* Filters */}
          <ul
            className="portfolio-filters isotope-filters"
            data-aos="fade-up"
            data-aos-delay="100"
            style={{
              backgroundColor: '#000',
              padding: '10px',
              borderRadius: '8px',
              marginBottom: '20px',
            }}
          >
            <li
              className={activeFilter === '*' ? 'filter-active active' : ''}
              onClick={() => setActiveFilter('*')}
              style={{
                color: activeFilter === '*' ? '#ffc107' : '',
                cursor: 'pointer',
              }}
            >
              All
            </li>
            {filteredCategories.map((cat) => (
              <li
                key={cat.id}
                className={activeFilter === cat.id.toString() ? 'active' : ''}
                onClick={() => setActiveFilter(cat.id.toString())}
                style={{
                  color: activeFilter === cat.id.toString() ? '#ffc107' : '',
                  cursor: 'pointer',
                }}
              >
                {cat.category.charAt(0).toUpperCase() + cat.category.slice(1)}
              </li>
            ))}
          </ul>

          {/* Portfolio Items */}
          <div className="row gy-4 isotope-container" data-aos="fade-up" data-aos-delay="200">
            {filteredWorks.map((work) => (
              <div
                key={work.id}
                className="col-lg-4 col-md-6 portfolio-item isotope-item"
              >
                <div className="portfolio-content" style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* Image */}
                    <Image
                      src={`${STORAGE_BASE_URL}/${work.image}`} // Use the correct image path
                      alt={`Project ${work.id}`}
                      width={400}
                      height={300}
                      className="img-fluid"
                      style={{ marginBottom: '10px' }}
                    />

                    {/* Portfolio Info */}
                    <div className="portfolio-info" style={{ textAlign: 'center', marginTop: '10px' }}>
                      <h4>Project #{work.id}</h4>
                      <p>
                        {filteredCategories.find((cat) => cat.id === work.categoryId)?.category}
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '40px' }}>
                        {/* Review Video Icon */}
                        <Tooltip title="Review Video">
                          <PlayCircleOutline
                            onClick={() => handleOpenVideoModal(work.video)}
                            style={{
                              fontSize: '30px',
                              color: '#ffc107',
                              cursor: 'pointer',
                            }}
                          />
                        </Tooltip>

                        {/* Redirect Icon */}
                        <Tooltip title="More Details">
                          <Link
                            onClick={() => router.push(`/works/${work.id}`)}
                            style={{
                              fontSize: '30px',
                              color: '#ffc107',
                              cursor: 'pointer',
                            }}
                          />
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {videoModalOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <Modal open={videoModalOpen} onClose={handleCloseVideoModal}>
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '90%',
                  maxWidth: '500px',
                  aspectRatio: '9/16', // Reel aspect ratio
                  bgcolor: '#1c1f23',
                  borderRadius: '10px',
                  boxShadow: 24,
                  p: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <video
                  src={currentVideo}
                  controls
                  autoPlay
                  style={{ width: '100%', height: '100%', borderRadius: '10px' }}
                ></video>
              </Box>
            </Modal>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
    </>

  );
}