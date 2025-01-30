import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from 'next/image';

const PortfolioDetails = () => {
  // Initialize AOS (Animate on Scroll)
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section id="portfolio-details" className="portfolio-details section">
      <div
        className="container"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <div className="row gy-4">
          <div className="col-lg-8">
            {/* Swiper Slider */}
            <Swiper
              modules={[Autoplay, Pagination]}
              loop={true}
              speed={600}
              autoplay={{ delay: 5000 }}
              slidesPerView="auto"
              pagination={{ clickable: true }}
              className="portfolio-details-slider"
            >
              <SwiperSlide>
                <Image src="/assets/images/product-1.jpg" alt="Product 1" />
              </SwiperSlide>
              <SwiperSlide>
                <Image src="/assets/images/product-2.jpg" alt="Branding 1" />
              </SwiperSlide>
              <SwiperSlide>
                <Image src="/assets/images/product-3.jpg" alt="Books 1" />
              </SwiperSlide>
              <SwiperSlide>
                <Image src="/assets/images/product-4.jpg" alt="App 1" />
              </SwiperSlide>
            </Swiper>
          </div>

          <div className="col-lg-4">
            {/* Project Information */}
            <div
              className="portfolio-info"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h3>Project information</h3>
              <ul>
                <li><strong>Category</strong>: Web design</li>
                <li><strong>Client</strong>: ASU Company</li>
                <li><strong>Project date</strong>: 01 March, 2020</li>
                <li>
                  <strong>Project URL</strong>: <a href="#">www.example.com</a>
                </li>
              </ul>
            </div>

            {/* Project Description */}
            <div
              className="portfolio-description"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <h2>Exercitationem repudiandae officiis neque suscipit</h2>
              <p>
                Autem ipsum nam porro corporis rerum. Quis eos dolorem eos itaque
                inventore commodi labore quia quia. Exercitationem repudiandae
                officiis neque suscipit non officia eaque itaque enim. Voluptatem
                officia accusantium nesciunt est omnis tempora consectetur
                dignissimos. Sequi nulla at esse enim cum deserunt eius.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioDetails;