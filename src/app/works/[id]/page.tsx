'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Divider,
  Skeleton,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FolderIcon from '@mui/icons-material/Folder';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useParams } from 'next/navigation';
import WorksHeader from '@/components/WorksHeader';
import Image from 'next/image';

const STORAGE_BASE_URL = 'http://localhost:5001/storage';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren"
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const slideUpVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
};

export default function WorkDetails() {
  const [work, setWork] = useState(null);
  const [category, setCategory] = useState(null);
  const [beforeAfterPosition, setBeforeAfterPosition] = useState(50);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    const fetchWorkDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/works/${id}`);
        if (!response.ok) throw new Error('Failed to fetch work details');
  
        const data = await response.json();
        setWork(data); // ✅ Directly set the object
  
        // ✅ Correct fetching of category
        if (data.work_category_id?._id) {
          const categoryResponse = await fetch(
            `http://localhost:5001/api/work-categories/${data.work_category_id._id}`
          );
          if (!categoryResponse.ok) throw new Error('Failed to fetch category details');
  
          const categoryData = await categoryResponse.json();
          setCategory(categoryData.category);
        }
      } catch (error) {
        console.error('Error fetching work details:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchWorkDetails();
  }, [id]);
  

  const handleBeforeAfterSlider = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const width = rect.width;
    setBeforeAfterPosition((offsetX / width) * 100);
  };

  const nextSlide = () => {
    if (work?.slider_images) {
      setCurrentSlide((prev) =>
        prev === work.slider_images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevSlide = () => {
    if (work?.slider_images) {
      setCurrentSlide((prev) =>
        prev === 0 ? work.slider_images.length - 1 : prev - 1
      );
    }
  };

  if (loading) {
    return (
      <Box sx={{ maxWidth: 1200, margin: '0 auto', mt: 4, p: 4 }}>
        <Box display="grid" gridTemplateColumns={{ xs: '1fr', lg: '2fr 1fr' }} gap={3}>
          <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 1 }} />
          <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 1 }} />
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box display="flex" alignItems="center" justifyContent="center" minHeight="50vh">
          <Box textAlign="center">
            <Typography variant="h4" color="#ffc107" gutterBottom>
              Error
            </Typography>
            <Typography color="text.secondary">{error}</Typography>
          </Box>
        </Box>
      </motion.div>
    );
  }

  if (!work) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box display="flex" alignItems="center" justifyContent="center" minHeight="50vh">
          <Box textAlign="center">
            <Typography variant="h4" color="#ffc107" gutterBottom>
              Work Not Found
            </Typography>
            <Typography color="text.secondary">
              The requested work could not be found.
            </Typography>
          </Box>
        </Box>
      </motion.div>
    );
  }

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
      <WorksHeader />
      
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="section dark-background"
      >
        <Box
          sx={{
            maxWidth: 1200,
            margin: '20px auto',
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
            gap: 3,
            p: 3
          }}
        >
          {/* Left Column */}
          <motion.div variants={containerVariants}>
            {/* Image Slider */}
            {Array.isArray(work.slider_images) && work.slider_images.length > 0 && (
              <motion.div variants={itemVariants}>
                <Box sx={{ position: 'relative', mb: 4 }}>
                  <Box sx={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
                    <AnimatePresence initial={false} mode='wait'>
                      <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        style={{ height: '100%', width: '100%' }}
                      >
                        <Image
                          width={500} // Replace with your image's width
                          height={300} // Replace with your image's height
                          src={`${STORAGE_BASE_URL}/${work.slider_images[currentSlide]}`}
                          alt={`Slide ${currentSlide + 1}`}
                          style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover',
                            borderRadius: '8px'
                          }}
                        />
                      </motion.div>
                    </AnimatePresence>

                    <IconButton
                      onClick={prevSlide}
                      sx={{
                        position: 'absolute',
                        left: 16,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        bgcolor: 'rgba(0, 0, 0, 0.6)',
                        color: '#ffc107',
                        '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.8)' },
                      }}
                    >
                      <ChevronLeftIcon />
                    </IconButton>
                    <IconButton
                      onClick={nextSlide}
                      sx={{
                        position: 'absolute',
                        right: 16,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        bgcolor: 'rgba(0, 0, 0, 0.6)',
                        color: '#ffc107',
                        '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.8)' },
                      }}
                    >
                      <ChevronRightIcon />
                    </IconButton>
                  </Box>

                  {/* Slider Dots */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 16,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      display: 'flex',
                      gap: 1,
                    }}
                  >
                    {work.slider_images.map((_, index) => (
                      <motion.div
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          backgroundColor: index === currentSlide ? '#ffc107' : 'rgba(255, 255, 255, 0.5)',
                          cursor: 'pointer',
                        }}
                        whileHover={{ scale: 1.2 }}
                      />
                    ))}
                  </Box>
                </Box>
              </motion.div>
            )}

            {/* Before/After Comparison */}
            {work.image_before && work.image_after && (
              <motion.div variants={itemVariants}>
                <Typography variant="h6" sx={{ color: '#ffc107', mb: 2 }}>
                  Before / After Comparison
                </Typography>
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  sx={{
                    position: 'relative',
                    height: 400,
                    cursor: 'ew-resize',
                    overflow: 'hidden',
                    borderRadius: '8px',
                  }}
                  onMouseMove={handleBeforeAfterSlider}
                >
                 <Image
                    src={`${STORAGE_BASE_URL}/${work.image_before}`}
                    alt="Before"
                    width={500} // Replace with your image's width
                    height={300} // Replace with your image's height
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      clipPath: `polygon(${beforeAfterPosition}% 0, 100% 0, 100% 100%, ${beforeAfterPosition}% 100%)`,
                    }}
                  >
                    <Image
                      src={`${STORAGE_BASE_URL}/${work.image_after}`}
                      alt="After"
                      width={500} // Replace with your image's width
                      height={300} // Replace with your image's height
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      position: 'absolute',
                      left: `${beforeAfterPosition}%`,
                      top: 0,
                      bottom: 0,
                      width: '3px',
                      backgroundColor: '#ffc107',
                    }}
                  />
                </Box>
              </motion.div>
            )}
          </motion.div>

          {/* Right Column */}
          <motion.div variants={containerVariants}>
            {/* Project Information */}
            <motion.div variants={slideUpVariants} transition={{ delay: 0.3 }}>
              <Box
                sx={{
                  p: 3,
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Typography variant="h6" sx={{ color: '#ffc107', mb: 2 }}>
                  Project Information
                </Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                  {[
                    { icon: <CalendarTodayIcon />, text: `Created: ${new Date(work.created_at).toLocaleDateString()}` },
                    { icon: <AccessTimeIcon />, text: `Updated: ${new Date(work.updated_at).toLocaleDateString()}` },
                    { icon: <FolderIcon />, text: `Category: ${category || 'Loading...'}` },
                    { icon: <LocalOfferIcon />, text: `Slug: ${work.slug}` }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.1 + 0.4 }}
                    >
                      <Box display="flex" alignItems="center" gap={1.5}>
                        <Box sx={{ color: '#ffc107' }}>{item.icon}</Box>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                          {item.text}
                        </Typography>
                      </Box>
                    </motion.div>
                  ))}
                </Box>
              </Box>
            </motion.div>

            {/* Video Section */}
            {work.video && (
              <motion.div
                variants={slideUpVariants}
                transition={{ delay: 0.5 }}
                style={{ marginTop: '2rem' }}
              >
                <Typography variant="h6" sx={{ color: '#ffc107', mb: 2 }}>
                  Project Video
                </Typography>
                <Box
                  sx={{
                    width: '100%',
                    aspectRatio: '9/16',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: 3
                  }}
                  component={motion.div}
                  whileHover={{ scale: 1.02 }}
                >
                  <video
                    src={`${STORAGE_BASE_URL}/${work.video}`}
                    controls
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
              </motion.div>
            )}
          </motion.div>
        </Box>
      </motion.section>
    </>
  );
}