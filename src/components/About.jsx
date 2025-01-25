'use client'; // Mark as a client component for interactivity

import Image from 'next/image';

export default function About({ about }) {
  if (!about || about.length === 0) {
    return <p>Loading...</p>; // Display a loading state if no data is passed
  }

  const aboutaboutData = about[0]; // Access the first object in the array

  return (
    <section id="about" className="about section dark-background">
      <div className="container">
        <div className="row gy-4">
          {/* Left Column */}
          <div className="col-lg-6 aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
            <h3>{aboutaboutData.title}</h3>
            <Image
              src={aboutaboutData.img1}
              alt="About Image"
              width={600}
              height={400}
              className="img-fluid rounded-4 mb-4"
            />
            <p>{aboutaboutData?.par1}</p>
            <p>{aboutaboutData?.par2}</p>
          </div>

          {/* Right Column */}
          <div className="col-lg-6 aos-init aos-animate" data-aos="fade-up" data-aos-delay="250">
            <div className="content ps-0 ps-lg-5">
              <p className="fst-italic">{aboutaboutData?.slug1}</p>
              <ul>
                {aboutaboutData?.list_items?.map((item, index) => (
                  <li key={index}>
                    <i className="bi bi-check-circle-fill"></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>{aboutaboutData?.slug2}</p>

              {/* Image with Play Button */}
              <div className="position-relative mt-4">
                <Image
                  src={aboutaboutData?.img2}
                  alt="About Image 2"
                  width={600}
                  height={400}
                  className="img-fluid rounded-4"
                />
                {aboutaboutData?.link && (
                  <a
                    href={aboutaboutData.link}
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