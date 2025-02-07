'use client'; // Mark as a client component for interactivity

import { useState } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Features({ services }) {
  const [activeTab, setActiveTab] = useState(services?.[0]?._id || ''); // Set the first service's ID as the default active tab

  // Slider settings
  const sliderSettings = {
    dots: false, // Hide dots
    infinite: true, // Infinite loop
    speed: 500, // Transition speed
    slidesToShow: 4, // Number of tabs to show at once
    slidesToScroll: 1, // Number of tabs to scroll
    swipeToSlide: true, // Enable swiping
    draggable: true, // Enable dragging
    responsive: [
      {
        breakpoint: 1024, // Adjust for smaller screens (e.g., tablets)
        settings: {
          slidesToShow: 3, // Show 3 tabs on tablets
        },
      },
      {
        breakpoint: 768, // Adjust for smaller tablets
        settings: {
          slidesToShow: 2, // Show 2 tabs on smaller tablets
        },
      },
      {
        breakpoint: 480, // Adjust for mobile devices
        settings: {
          slidesToShow: 1, // Show 1 tab on mobile
          centerMode: true, // Center the active tab
          centerPadding: '20px', // Add padding to the sides
        },
      },
    ],
  };

  return (
    <section id="services" className="features section dark-background">
      <div className="container section-title aos-init aos-animate" data-aos="fade-up">
        <h2>Services</h2>
        <p>CHECK OUR SERVICES</p>
      </div>
      <div className="container">
        {/* Tabs Navigation */}
        <Slider {...sliderSettings} className="nav-tabs-slider">
          {services.map((service) => (
            <div key={service._id} className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === service._id ? 'active show' : ''}`}
                onClick={() => setActiveTab(service._id)}
                role="tab"
                style={{
                  minWidth: '300px',
                  maxWidth: '300px',
                  wordWrap: 'break-word', // Ensures long words are wrapped
                  overflowWrap: 'break-word', // Handles wrapping for browsers
                  backgroundColor: activeTab === service._id ? '#ffc107' : '',
                  borderColor: activeTab === service._id ? '#ffc107' : '',
                }}
              >
                <i className={service.icon}></i>
                <h4
                  className="d-none d-lg-block"
                  style={{
                    wordWrap: 'break-word', // Wraps long words to the next line
                    overflowWrap: 'break-word', // Adds support for older browsers
                    whiteSpace: 'normal', // Ensures text breaks into multiple lines
                    textAlign: 'center', // Optionally center-aligns text
                  }}
                >
                  {service.title}
                </h4>
              </button>
            </div>
          ))}
        </Slider>

        {/* Tabs Content */}
        <div
          className="tab-content aos-init aos-animate"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {services.map((service) => (
            <div
              key={service._id}
              className={`tab-pane fade ${activeTab === service._id ? 'active show' : ''}`}
              id={service._id}
              role="tabpanel"
            >
              <div className="row">
                <div className="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0">
                  <h3>{service.heading}</h3>
                  <p className="fst-italic">{service.description}</p>
                  <ul>
                    {service.list_items.map((item, index) => (
                      <li key={index}>
                        <i className="bi bi-check2-all"></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {service.paragraph && <p>{service.paragraph}</p>}
                </div>
                <div className="col-lg-6 order-1 order-lg-2 text-center">
                  <Image
                    src={`http://localhost:5001/storage/${service.image}`} // Construct the full image URL
                    alt={service.title}
                    width={600}
                    height={400}
                    className="img-fluid"
                    onError={(e) => {
                      e.target.onerror = null; // Prevent infinite error loop
                      e.target.src = '/default-image.png'; // Fallback image in case of error
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}