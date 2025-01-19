'use client'; // Mark as a client component for interactivity

import Image from 'next/image';

export default function Portfolio() {
  // Portfolio items data
  const portfolioItems = [
    { category: 'app', img: '/assets/images/app-1.jpg', title: 'App 1' },
    { category: 'product', img: '/assets/images/product-1.jpg', title: 'Product 1' },
    { category: 'branding', img: '/assets/images/branding-1.jpg', title: 'Branding 1' },
    { category: 'books', img: '/assets/images/books-1.jpg', title: 'Books 1' },
    { category: 'app', img: '/assets/images/app-2.jpg', title: 'App 2' },
    { category: 'product', img: '/assets/images/product-2.jpg', title: 'Product 2' },
    { category: 'branding', img: '/assets/images/branding-2.jpg', title: 'Branding 2' },
    { category: 'books', img: '/assets/images/books-2.jpg', title: 'Books 2' },
    { category: 'app', img: '/assets/images/app-3.jpg', title: 'App 3' },
    { category: 'product', img: '/assets/images/product-3.jpg', title: 'Product 3' },
    { category: 'branding', img: '/assets/images/branding-3.jpg', title: 'Branding 3' },
    { category: 'books', img: '/assets/images/books-3.jpg', title: 'Books 3' },
  ];

  return (
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
          <ul className="portfolio-filters isotope-filters aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
            <li data-filter="*" className="filter-active">
              All
            </li>
            <li data-filter=".filter-app">App</li>
            <li data-filter=".filter-product">Product</li>
            <li data-filter=".filter-branding">Branding</li>
            <li data-filter=".filter-books">Books</li>
          </ul>

          {/* Portfolio Items */}
          <div className="row gy-4 isotope-container aos-init aos-animate" data-aos="fade-up" data-aos-delay="200">
            {portfolioItems.map((item, index) => (
              <div
                key={index}
                className={`col-lg-4 col-md-6 portfolio-item isotope-item filter-${item.category}`}
              >
                <div className="portfolio-content h-100">
                  {/* Image */}
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={400}
                    height={300}
                    className="img-fluid"
                  />

                  {/* Portfolio Info */}
                  <div className="portfolio-info">
                    <h4>{item.title}</h4>
                    <p>Lorem ipsum, dolor sit amet consectetur</p>
                    <a
                      href={item.img}
                      title={item.title}
                      data-gallery={`portfolio-gallery-${item.category}`}
                      className="glightbox preview-link"
                    >
                      <i className="bi bi-zoom-in"></i>
                    </a>
                    <a href="#" title="More Details" className="details-link">
                      <i className="bi bi-link-45deg"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}