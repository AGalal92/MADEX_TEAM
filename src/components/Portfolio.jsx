'use client'; // Mark as a client component for interactivity

import { useState } from 'react';
import Image from 'next/image';

export default function Portfolio({ works }) {
  const [activeFilter, setActiveFilter] = useState('*'); // State for the active filter

  if (!works || works.length === 0) {
    return <p>Loading...</p>; // Display a loading state if no data is passed
  }

  // Extract unique categories from `works`
  const categories = [...new Set(works.map((work) => work.category))];

  // Filter works based on the active filter
  const filteredWorks =
    activeFilter === '*'
      ? works
      : works.filter((work) => work.category.toLowerCase() === activeFilter);

  // Styled scrollable container
  const containerStyle = {
    height: '600px', // Adjust as needed
    overflowY: 'auto',
    padding: '30px',
    scrollbarWidth: 'thin', // For Firefox
    scrollbarColor: '#ffc107 #000', // Scroll thumb and track colors
  };

  // Add scroll style for WebKit browsers (Chrome, Edge, Safari)
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
      {/* Add WebKit scrollbar styles */}
      <style>{scrollStyle}</style>

      <section id="portfolio" className="portfolio section dark-background">
        {/* Section Title */}
        <div className="container section-title aos-init aos-animate" data-aos="fade-up">
          <h2>Portfolio</h2>
          <p>CHECK OUR PORTFOLIO</p>
        </div>

        {/* Portfolio Filters and Items */}
        <div className="container">
          <div className="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">
            {/* Filters */}
            <ul
              className="portfolio-filters isotope-filters aos-init aos-animate"
              data-aos="fade-up"
              data-aos-delay="100"
              style={{
                backgroundColor: '#000', // Set the background color
                padding: '10px', // Add some padding for spacing
                borderRadius: '8px', // Optional: Add rounded corners
                marginBottom: '20px', // Optional: Add some spacing below the filters
              }}
            >
              <li
                className={activeFilter === '*' ? 'filter-active active' : ''}
                onClick={() => setActiveFilter('*')}
                style={{
                  color: activeFilter === '*' ? '#ffc107' : '', // Highlight active tab
                  cursor: 'pointer',
                }}
              >
                All
              </li>
              {categories.map((category, index) => (
                <li
                  key={index}
                  className={activeFilter === category.toLowerCase() ? 'active' : ''}
                  onClick={() => setActiveFilter(category.toLowerCase())}
                  style={{
                    color: activeFilter === category.toLowerCase() ? '#ffc107' : '', // Highlight active tab
                    cursor: 'pointer',
                  }}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </li>
              ))}
            </ul>


            {/* Portfolio Items */}
            <div
              className="row gy-4 isotope-container aos-init aos-animate"
              data-aos="fade-up"
              data-aos-delay="200"
              style={containerStyle}
            >
              {filteredWorks.map((work) => (
                <div
                  key={work.id}
                  className={`col-lg-4 col-md-6 portfolio-item isotope-item filter-${work.category
                    .toLowerCase()
                    .replace(/\s+/g, '-')}`}
                >
                  <div className="portfolio-content" style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      {/* Image */}
                      <Image
                        src={work.img}
                        alt={work.title}
                        width={400}
                        height={300}
                        className="img-fluid"
                        style={{ marginBottom: '10px' }} // Add some spacing below the image
                      />

                      {/* Portfolio Info */}
                      <div className="portfolio-info" style={{ textAlign: 'center', marginTop: '10px' }}>
                        <h4>{work.title}</h4>
                        <p>{work.category.charAt(0).toUpperCase() + work.category.slice(1)}</p>
                        <div>
                          <a
                            href={work.img}
                            title={work.title}
                            data-gallery={`portfolio-gallery-${work.category}`}
                            className="glightbox preview-link"
                            style={{ marginRight: '10px' }}
                          >
                            <i className="bi bi-zoom-in"></i>
                          </a>
                          <a href="#" title="More Details" className="details-link">
                            <i className="bi bi-link-45deg"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
