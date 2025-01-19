'use client'; // Mark as a client component for interactivity

import Image from 'next/image';

export default function FeaturedServices() {
  // Services data
  const services = [
    {
      id: 1,
      img: '/assets/images/services-1.jpg',
      icon: 'bi bi-activity',
      title: 'Nesciunt Mete',
      description:
        'Provident nihil minus qui consequatur non omnis maiores. Eos accusantium minus dolores iure perferendis.',
    },
    {
      id: 2,
      img: '/assets/images/services-2.jpg',
      icon: 'bi bi-broadcast',
      title: 'Eosle Commodi',
      description:
        'Ut autem aut autem non a. Sint sint sit facilis nam iusto sint. Libero corrupti neque eum hic non ut nesciunt dolorem.',
    },
    {
      id: 3,
      img: '/assets/images/services-3.jpg',
      icon: 'bi bi-easel',
      title: 'Ledo Markt',
      description:
        'Ut excepturi voluptatem nisi sed. Quidem fuga consequatur. Minus ea aut. Vel qui id voluptas adipisci eos earum corrupti.',
    },
  ];

  return (
    <section id="featured-services" className="services section dark-background">
      {/* Section Title */}
      <div className="container section-title aos-init aos-animate" data-aos="fade-up">
        <h2>Services</h2>
        <p>Featured Services</p>
      </div>

      {/* Services Grid */}
      <div className="container aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-5">
          {services.map((service) => (
            <div
              key={service.id}
              className="col-xl-4 col-md-6 aos-init aos-animate"
              data-aos="zoom-in"
              data-aos-delay={200 + service.id * 100}
            >
              <div className="service-item">
                {/* Image */}
                <div className="img">
                  <Image
                    src={service.img} // Update the path to your image
                    alt={service.title}
                    width={400} // Adjust as needed
                    height={300} // Adjust as needed
                    className="img-fluid"
                  />
                </div>

                {/* Details */}
                <div className="details position-relative">
                  {/* Icon */}
                  <div className="icon">
                    <i className={service.icon}></i>
                  </div>

                  {/* Title */}
                  <a href="#" className="stretched-link">
                    <h3>{service.title}</h3>
                  </a>

                  {/* Description */}
                  <p>{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}