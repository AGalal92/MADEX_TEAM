'use client'; // Mark as a client component for interactivity

import { useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css'; // Swiper styles

export default function Testimonials() {
  // Testimonials data
  const testimonials = [
    {
      img: '/assets/images/testimonials-1.jpg',
      name: 'Saul Goodman',
      role: 'Ceo & Founder',
      quote:
        'Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.',
    },
    {
      img: '/assets/images/testimonials-2.jpg',
      name: 'Sara Wilsson',
      role: 'Designer',
      quote:
        'Export tempor illum tamen malis malis eram quae irure esse labore quem cillum quid cillum eram malis quorum velit fore eram velit sunt aliqua noster fugiat irure amet legam anim culpa.',
    },
    {
      img: '/assets/images/testimonials-3.jpg',
      name: 'Jena Karlis',
      role: 'Store Owner',
      quote:
        'Enim nisi quem export duis labore cillum quae magna enim sint quorum nulla quem veniam duis minim tempor labore quem eram duis noster aute amet eram fore quis sint minim.',
    },
    {
      img: '/assets/images/testimonials-4.jpg',
      name: 'Matt Brandon',
      role: 'Freelancer',
      quote:
        'Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos export minim fugiat minim velit minim dolor enim duis veniam ipsum anim magna sunt elit fore quem dolore labore illum veniam.',
    },
    {
      img: '/assets/images/testimonials-5.jpg',
      name: 'John Larson',
      role: 'Entrepreneur',
      quote:
        'Quis quorum aliqua sint quem legam fore sunt eram irure aliqua veniam tempor noster veniam enim culpa labore duis sunt culpa nulla illum cillum fugiat legam esse veniam culpa fore nisi cillum quid.',
    },
  ];

  useEffect(() => {
    // Initialize Swiper (if needed)
    import('swiper').then((Swiper) => {
      new Swiper.default('.swiper', {
        loop: true,
        speed: 600,
        autoplay: {
          delay: 5000,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      });
    });
  }, []);

  return (
    <section id="testimonials" className="testimonials section dark-background relative">
      {/* Background Image */}
      <Image
        src="/assets/images/testimonials-bg.jpg" // Update the path to your image
        alt="Testimonials Background"
        width={1920}
        height={1080}
        className="testimonials-bg absolute inset-0 w-full h-full object-cover"
      />

      {/* Testimonials Slider */}
      <div className="container aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
        <Swiper
          modules={[Autoplay, Pagination]}
          loop={true}
          speed={600}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          className="swiper"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="testimonial-item text-center">
                {/* Testimonial Image */}
                <Image
                  src={testimonial.img}
                  alt={testimonial.name}
                  width={100}
                  height={100}
                  className="testimonial-img rounded-full mx-auto mb-4"
                />

                {/* Testimonial Content */}
                <h3>{testimonial.name}</h3>
                <h4>{testimonial.role}</h4>

                {/* Stars */}
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="bi bi-star-fill"></i>
                  ))}
                </div>

                {/* Quote */}
                <p>
                  <i className="bi bi-quote quote-icon-left"></i>
                  {testimonial.quote}
                  <i className="bi bi-quote quote-icon-right"></i>
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}