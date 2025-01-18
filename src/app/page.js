// src/app/page.js
'use client';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Stats from '../components/Stats';
import FeaturedServices from '../components/FeaturedServices';
import Clients from '../components/Clients';
import Features from '../components/Features';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import Portfolio from '../components/Portfolio';
import Team from '../components/Team';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { useEffect } from 'react';

export default function Home() {
  const aboutData = {
    title: 'About Us',
    img1: '/assets/images/about.jpg',
    par1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    par2: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    slug1: 'Ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    slug2: 'Duis aute irure dolor in reprehenderit in voluptate velit.',
    img2: '/assets/images/about-2.jpg',
    link: 'https://example.com',
  };

  useEffect(() => {
    // Dynamically import AOS
    import('aos').then((AOS) => {
      AOS.init({ duration: 1000 });
    });

    // Dynamically import GLightbox
    import('glightbox').then((GLightbox) => {
      GLightbox.default({
        selector: '.glightbox',
      });
    });

    // Dynamically import PureCounter
    import('@srexi/purecounterjs').then((PureCounter) => {
      new PureCounter.default();
    });
  }, []);

  return (
    <>
      <Header />
      <Hero />
      <About about={aboutData} />
      <Stats />
      <FeaturedServices />
      <Clients />
      <Features />
      <Services />
      <Testimonials />
      <Portfolio />
      <Team />
      <Contact />
      <Footer />
      <ScrollToTop />
    </>
  );
}