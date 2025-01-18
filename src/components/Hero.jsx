// src/components/Hero.jsx
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  // JSON data for hero content
  const heroData = {
    slideshowImages: [1, 2, 3, 4, 5, 6], // Image indices for the slideshow
    title: {
      part1: 'MADEX',
      part2: 'Team.',
      color: '#ffc907', // Highlight color
    },
    subtitle: {
      text: 'Coming Soon',
      fontSize: '6em',
      fontWeight: 900,
      color: '#ffc907',
    },
    buttons: [
      {
        type: 'link',
        label: 'Get Started',
        href: '#about',
        className: 'btn-get-started',
      },
      {
        type: 'video',
        label: 'Watch Video',
        href: 'https://www.youtube.com/watch?v=Y7f98aduVJ8',
        className: 'glightbox btn-watch-video d-flex align-items-center',
        icon: 'bi bi-play-circle',
      },
    ],
  };

  return (
    <section id="hero" className="hero section dark-background">
      <ul className="slideshow">
        {heroData.slideshowImages.map((index) => (
          <li key={index}>
            <span>Image 0{index}</span>
            {index === 1 && (
              <div>
                <h3>A little something something</h3>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="container d-flex flex-column align-items-right">
        <h2 data-aos="fade-up" data-aos-delay="100">
          <span style={{ color: heroData.title.color }}>{heroData.title.part1}</span>{' '}
          {heroData.title.part2}
        </h2>
        <p
          data-aos="fade-up"
          data-aos-delay="200"
          style={{
            fontSize: heroData.subtitle.fontSize,
            fontWeight: heroData.subtitle.fontWeight,
            color: heroData.subtitle.color,
          }}
        >
          {heroData.subtitle.text}
        </p>
        <div className="d-flex mt-4" data-aos="fade-up" data-aos-delay="300">
          {heroData.buttons.map((button, index) => (
            button.type === 'link' ? (
              <Link style={{ textDecoration: 'none' }} key={index} href={button.href} className={button.className}>
                {button.label}
              </Link>
            ) : (
              <a
                style={{ textDecoration: 'none' }}
                key={index}
                href={button.href}
                className={button.className}
              >
                <i className={button.icon}></i>
                <span>{button.label}</span>
              </a>
            )
          ))}
        </div>
      </div>
    </section>
  );
}