// src/components/ScrollToTop.js
'use client';

import { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show the button when the user scrolls down 300px
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scroll
    });
  };

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener('scroll', toggleVisibility);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
    {isVisible && (
  <button
    onClick={scrollToTop}
    className="bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-lg shadow-lg transition-all duration-300"
    aria-label="Scroll to top"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-3 w-3" // Large icon size
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="square"
        strokeLinejoin="bevel"
        strokeWidth={3}
        d="M5 10l7-7m0 0l7 7m-7-7v18"
      />
    </svg>
  </button>
)}
    </div>
  );
}