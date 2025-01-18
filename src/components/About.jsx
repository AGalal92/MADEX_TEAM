'use client'; // Mark as a client component for interactivity

import Image from 'next/image';

export default function About() {
  // About data (replace with your actual data or fetch from an API)
  const about = {
    title: 'About Us',
    img1: '/assets/images/about.jpg',
    par1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    par2: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    slug1: 'Our mission is to provide high-quality services and solutions to our clients.',
    slug2: 'We strive to deliver innovative and reliable solutions that meet the needs of our clients.',
    img2: '/assets/images/about-2.jpg',
    link: 'https://www.youtube.com/watch?v=example', // Replace with your video link
  };

  return (
    <section id="about" className="about section dark-background">
      <div className="container">
        <div className="row gy-4">
          {/* Left Column */}
          <div className="col-lg-6 aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
            <h3>{about.title}</h3>
            <Image
              src={about.img1}
              alt="About Image"
              width={600}
              height={400}
              className="img-fluid rounded-4 mb-4"
            />
            <p>{about.par1}</p>
            <p>{about.par2}</p>
          </div>

          {/* Right Column */}
          <div className="col-lg-6 aos-init aos-animate" data-aos="fade-up" data-aos-delay="250">
            <div className="content ps-0 ps-lg-5">
              <p className="fst-italic">{about.slug1}</p>
              <ul>
                <li>
                  <i className="bi bi-check-circle-fill"></i>
                  <span>Ullamco laboris nisi ut aliquip ex ea commodo consequat.</span>
                </li>
                <li>
                  <i className="bi bi-check-circle-fill"></i>
                  <span>Duis aute irure dolor in reprehenderit in voluptate velit.</span>
                </li>
                <li>
                  <i className="bi bi-check-circle-fill"></i>
                  <span>
                    Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                    voluptate trideta storacalaperda mastiro dolore eu fugiat nulla pariatur.
                  </span>
                </li>
              </ul>
              <p>{about.slug2}</p>

              {/* Image with Play Button */}
              <div className="position-relative mt-4">
                <Image
                  src={about.img2}
                  alt="About Image 2"
                  width={600}
                  height={400}
                  className="img-fluid rounded-4"
                />
                {about.link && (
                  <a
                    href={about.link}
                    className="glightbox pulsating-play-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  ></a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}