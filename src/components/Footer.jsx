// src/components/Footer.jsx
import Link from 'next/link';

export default function Footer() {
  // JSON data for footer content
  const footerData = {
    about: {
      sitename: 'Madex Team',
      address: 'A108 Adam Street',
      city: 'New York, NY 535022',
      phone: '+1 5589 55488 55',
      email: 'info@example.com',
      socialLinks: [
        { icon: 'bi bi-twitter-x', label: 'Twitter', href: '#' },
        { icon: 'bi bi-facebook', label: 'Facebook', href: '#' },
        { icon: 'bi bi-instagram', label: 'Instagram', href: '#' },
        { icon: 'bi bi-linkedin', label: 'LinkedIn', href: '#' },
      ],
    },
    usefulLinks: [
      { label: 'Home', href: '/' },
      { label: 'About us', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Terms of service', href: '/terms' },
      { label: 'Privacy policy', href: '/privacy' },
    ],
    services: [
      { label: 'Web Design', href: '/web-design' },
      { label: 'Web Development', href: '/web-development' },
      { label: 'Product Management', href: '/product-management' },
      { label: 'Marketing', href: '/marketing' },
      { label: 'Graphic Design', href: '/graphic-design' },
    ],
    newsletter: {
      title: 'Our Newsletter',
      description: 'Subscribe to our newsletter and receive the latest news about our products and services!',
    },
    copyright: {
      text: '© Copyright',
      sitename: 'Madex Team',
      rights: 'All Rights Reserved',
      credits: 'Designed by',
      creditsLink: { label: 'Legion', href: '/' },
    },
  };

  return (
    <footer id="footer" className="footer dark-background">
      <div className="container footer-top">
        <div className="row gy-4">
          {/* About Section */}
          <div className="col-lg-4 col-md-6 footer-about">
            <Link style={{ textDecoration: 'none' }} href="/" className="logo d-flex align-items-center">
              <span className="sitename">{footerData.about.sitename}</span>
            </Link>
            <div className="footer-contact pt-3">
              <p>{footerData.about.address}</p>
              <p>{footerData.about.city}</p>
              <p className="mt-3">
                <strong>Phone:</strong> <span>{footerData.about.phone}</span>
              </p>
              <p>
                <strong>Email:</strong> <span>{footerData.about.email}</span>
              </p>
            </div>
            <div className="social-links d-flex mt-4">
              {footerData.about.socialLinks.map((social, index) => (
                <a key={index} href={social.href} aria-label={social.label}>
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Useful Links Section */}
          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Useful Links</h4>
            <ul>
              {footerData.usefulLinks.map((link, index) => (
                <li key={index}>
                  <i className="bi bi-chevron-right"></i>{' '}
                  <Link style={{ textDecoration: 'none' }} href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services Section */}
          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Our Services</h4>
            <ul>
              {footerData.services.map((service, index) => (
                <li key={index}>
                  <i className="bi bi-chevron-right"></i>{' '}
                  <Link style={{ textDecoration: 'none' }} href={service.href}>{service.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="col-lg-4 col-md-12 footer-newsletter">
            <h4>{footerData.newsletter.title}</h4>
            <p>{footerData.newsletter.description}</p>
            <form className="php-email-form">
              <div className="newsletter-form">
                <input type="email" name="email" placeholder="Your Email" required />
                <input type="submit" value="Subscribe" />
              </div>
              <div className="loading">Loading</div>
              <div className="error-message"></div>
              <div className="sent-message">
                Your subscription request has been sent. Thank you!
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="container copyright text-center mt-4">
        <p>
          {footerData.copyright.text}{' '}
          <strong className="px-1 sitename">{footerData.copyright.sitename}</strong>
          {footerData.copyright.rights}
        </p>
        <div className="credits">
          {footerData.copyright.credits}{' '}
          <Link style={{ textDecoration: 'none' }} href={footerData.copyright.creditsLink.href}>
            {footerData.copyright.creditsLink.label}
          </Link>
        </div>
      </div>
    </footer>
  );
}