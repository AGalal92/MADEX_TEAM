import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from "framer-motion";

export default function Hero() {
  const heroData = {
    slideshowImages: [1, 2, 3, 4, 5, 6], // List of images
    title: { part1: 'MADEX', part2: 'Team.', color: '#ffc907' },
    subtitle: { text: '', fontSize: '6em', fontWeight: 900, color: '#ffc907' },
    buttons: [
      { type: 'link', label: 'Get Started', href: '#about', className: 'btn-get-started' },
      { type: 'video', label: 'Watch Video', href: 'https://www.youtube.com/watch?v=Y7f98aduVJ8', className: 'btn-watch-video', icon: 'bi bi-play-circle' },
    ],
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track current image index

  // Automatically change images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % heroData.slideshowImages.length // Loop through images
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [heroData.slideshowImages.length]);

  return (
    <section id="hero" className="hero section dark-background">
      <div className="slideshow">
        <AnimatePresence>
          {heroData.slideshowImages.map((index, idx) => (
            idx === currentImageIndex && (
              <motion.div
                key={index}
                initial={{ opacity: 0 }} // Start fully transparent
                animate={{ opacity: 1 }} // Fade in
                exit={{ opacity: 0 }} // Fade out when exiting
                transition={{ duration: 1 }} // Duration of the animation
                className="slideshow-item"
              >
                <Image
                  src={`/assets/images/mad${index}.jpg`}
                  alt={`Madex Slide ${index}`}
                  layout="fill" // Ensures the image fills the container
                  objectFit="cover" // Ensures it covers the full container without distortion
                  priority={idx === 0}
                />
                <div>
                  <h3>Welcome to Madex Team</h3>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>
      <div className="container d-flex flex-column align-items-right">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
          className="hero-title"
        >
          <span style={{ color: heroData.title.color }}>{heroData.title.part1}</span>{' '}
          {heroData.title.part2}
        </motion.h2>
        <p
          style={{
            fontSize: heroData.subtitle.fontSize,
            fontWeight: heroData.subtitle.fontWeight,
            color: heroData.subtitle.color,
          }}
        >
          {heroData.subtitle.text}
        </p>
        <div className="d-flex mt-4">
          {heroData.buttons.map((button, index) =>
            button.type === 'link' ? (
              <Link
                style={{ textDecoration: 'none' }}
                key={index}
                href={button.href}
                className={button.className}
              >
                {button.label}
              </Link>
            ) : (
              <a
                key={index}
                href={button.href}
                className={button.className}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={button.label}
              >
                <i className={button.icon} aria-hidden="true"></i>
                <span>{button.label}</span>
              </a>
            )
          )}
        </div>
      </div>
    </section>
  );
}
