'use client'; // Mark as a client component for interactivity

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function WorksHeader() {
  const [activeSection, setActiveSection] = useState('hero'); // Default to 'hero' section
  const [isScrolled, setIsScrolled] = useState(false); // State to track scroll position

  // JSON data for header content
  const headerData = {
    logo: {
      src: '/assets/images/MadeX - white horizontal.png',
      alt: 'MadeX Logo',
      width: 90,
      height: 50,
    },
    navLinks: [
      { id: 'hero', label: 'Home', href: '#hero' },
      { id: 'about', label: 'About', href: '#about' },
      { id: 'services', label: 'Services', href: '#services' },
      { id: 'portfolio', label: 'Portfolio', href: '#portfolio' },
      { id: 'team', label: 'Team', href: '#team' },
      { id: 'contact', label: 'Contact', href: '#contact' },
    ],
    ctaButton: {
      label: 'Get Started',
      href: '#about',
    },
  };

  useEffect(() => {
    // Function to handle intersection observer for active sections
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id); // Set the active section to the ID of the intersecting element
        }
      });
    };

    // Create an IntersectionObserver for active sections
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // Adjust this value to control when the section is considered "active"
    });

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    // Cleanup observer on unmount
    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  useEffect(() => {
    // Function to handle scroll event
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true); // Add background when scrolled
      } else {
        setIsScrolled(false); // Remove background when at the top
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      id="header"
      className={`header d-flex align-items-center fixed-top ${isScrolled ? '' : ''}`}
      style={{
        transition: 'background-color 0.3s ease',
        backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.85)' : 'transparent',
      }}
    >
      <div className="container-fluid container-xl position-relative d-flex align-items-center">
        {/* Logo */}
        <Link href="/" className="logo d-flex align-items-center me-auto">
          <Image
            src={headerData.logo.src}
            alt={headerData.logo.alt}
            width={headerData.logo.width}
            height={headerData.logo.height}
          />
        </Link>

       

      </div>
    </header>
  );
}