'use client'; // Mark as a client component for interactivity

import { useEffect } from 'react';

export default function Stats() {
  // Initialize PureCounter
  useEffect(() => {
    import('@srexi/purecounterjs').then((module) => {
      const PureCounter = module.default;
      new PureCounter();
    });
  }, []);

  // Stats data
  const stats = [
    {
      id: 1,
      icon: 'bi bi-emoji-smile color-blue',
      value: 232,
      label: 'Happy Clients',
    },
    {
      id: 2,
      icon: 'bi bi-journal-richtext color-orange',
      value: 521,
      label: 'Projects',
    },
    {
      id: 3,
      icon: 'bi bi-headset color-green',
      value: 1463,
      label: 'Hours Of Support',
    },
    {
      id: 4,
      icon: 'bi bi-people color-pink',
      value: 15,
      label: 'Hard Workers',
    },
  ];

  return (
    <section id="stats" className="stats section dark-background">
      <div className="container aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4">
          {stats.map((stat) => (
            <div key={stat.id} className="col-lg-3 col-md-6">
              <div className="stats-item d-flex align-items-center w-100 h-100">
                {/* Icon */}
                <i className={stat.icon}></i>

                {/* Content */}
                <div>
                  <span
                    data-purecounter-start="0"
                    data-purecounter-end={stat.value}
                    data-purecounter-duration="1"
                    className="purecounter"
                  >
                    {stat.value}
                  </span>
                  <p>{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}