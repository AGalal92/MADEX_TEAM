'use client'; // Mark as a client component for interactivity

import { useState } from 'react';
import Image from 'next/image';

export default function Features() {
  const [activeTab, setActiveTab] = useState('features-tab-1');

  // Features data
  const features = [
    {
      id: 'features-tab-1',
      icon: 'bi bi-binoculars',
      title: 'Modi sit est dela pireda nest',
      image: '/assets/images/working-1.jpg',
      content: {
        heading: 'Voluptatem dignissimos provident quasi corporis voluptates sit assumenda.',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        listItems: [
          'Ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          'Duis aute irure dolor in reprehenderit in voluptate velit.',
          'Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate trideta storacalaperda mastiro dolore eu fugiat nulla pariatur.',
        ],
        paragraph:
          'Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
      },
    },
    {
      id: 'features-tab-2',
      icon: 'bi bi-box-seam',
      title: 'Unde praesenti mara setra le',
      image: '/assets/images/working-2.jpg',
      content: {
        heading: 'Neque exercitationem debitis soluta quos debitis quo mollitia officia est',
        description:
          'Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        listItems: [
          'Ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          'Duis aute irure dolor in reprehenderit in voluptate velit.',
          'Provident mollitia neque rerum asperiores dolores quos qui a. Ipsum neque dolor voluptate nisi sed.',
          'Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate trideta storacalaperda mastiro dolore eu fugiat nulla pariatur.',
        ],
      },
    },
    {
      id: 'features-tab-3',
      icon: 'bi bi-brightness-high',
      title: 'Pariatur explica nitro dela',
      image: '/assets/images/working-3.jpg',
      content: {
        heading: 'Voluptatibus commodi ut accusamus ea repudiandae ut autem dolor ut assumenda',
        description:
          'Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        listItems: [
          'Ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          'Duis aute irure dolor in reprehenderit in voluptate velit.',
          'Provident mollitia neque rerum asperiores dolores quos qui a. Ipsum neque dolor voluptate nisi sed.',
        ],
      },
    },
    {
      id: 'features-tab-4',
      icon: 'bi bi-command',
      title: 'Nostrum qui dile node',
      image: '/assets/images/working-4.jpg',
      content: {
        heading: 'Omnis fugiat ea explicabo sunt dolorum asperiores sequi inventore rerum',
        description:
          'Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        listItems: [
          'Ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          'Duis aute irure dolor in reprehenderit in voluptate velit.',
          'Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate trideta storacalaperda mastiro dolore eu fugiat nulla pariatur.',
        ],
      },
    },
  ];

  return (
    <section id="features" className="features section dark-background">
      <div className="container">
        {/* Tabs Navigation */}
        <ul
          className="nav nav-tabs row d-flex aos-init aos-animate"
          data-aos="fade-up"
          data-aos-delay="100"
          role="tablist"
        >
          {features.map((feature) => (
            <li key={feature.id} className="nav-item col-3" role="presentation">
              <button
                className={`nav-link ${activeTab === feature.id ? 'active show' : ''}`}
                onClick={() => setActiveTab(feature.id)}
                role="tab"
              >
                <i className={feature.icon}></i>
                <h4 className="d-none d-lg-block">{feature.title}</h4>
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
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`tab-pane fade ${activeTab === feature.id ? 'active show' : ''}`}
              id={feature.id}
              role="tabpanel"
            >
              <div className="row">
                <div className="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0">
                  <h3>{feature.content.heading}</h3>
                  <p className="fst-italic">{feature.content.description}</p>
                  <ul>
                    {feature.content.listItems.map((item, index) => (
                      <li key={index}>
                        <i className="bi bi-check2-all"></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {feature.content.paragraph && <p>{feature.content.paragraph}</p>}
                </div>
                <div className="col-lg-6 order-1 order-lg-2 text-center">
                  <Image
                    src={feature.image}
                    alt={feature.title}
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