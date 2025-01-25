'use client'; // Mark as a client component for interactivity

import { useState } from 'react';
import Image from 'next/image';

export default function Features({ services }) {
  const [activeTab, setActiveTab] = useState(services?.[0]?.id || ''); // Set the first service's ID as the default active tab

  return (
    <section id="services" className="features section dark-background">
      <div className="container section-title aos-init aos-animate" data-aos="fade-up">
        <h2>Services</h2>
        <p>CHECK OUR SERVICES</p>
      </div>
      <div className="container">
        {/* Tabs Navigation */}
        <ul
          className="nav nav-tabs row d-flex aos-init aos-animate"
          data-aos="fade-up"
          data-aos-delay="100"
          role="tablist"
        >
          {services.map((service) => (
            <li key={service.id} className="nav-item col-3" role="presentation">
              <button
                className={`nav-link ${activeTab === service.id ? 'active show' : ''}`}
                onClick={() => setActiveTab(service.id)}
                role="tab"
                style={{
                  minWidth: '300px',
                  maxWidth: '300px',
                  wordWrap: 'break-word', // Ensures long words are wrapped
                  overflowWrap: 'break-word', // Handles wrapping for browsers
                  backgroundColor: activeTab === service.id ? '#ffc107' : '',
                  borderColor: activeTab === service.id ? '#ffc107' : '',
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

            </li>
          ))}
        </ul>

        {/* Tabs Content */}
        <div
          className="tab-content aos-init aos-animate"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {services.map((service) => (
            <div
              key={service.id}
              className={`tab-pane fade ${activeTab === service.id ? 'active show' : ''}`}
              id={service.id}
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
                    src={service.image}
                    alt={service.title}
                    width={600}
                    height={400}
                    className="img-fluid"
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
