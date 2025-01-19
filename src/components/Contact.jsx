// src/components/Contact.jsx
export default function Contact() {
  // JSON data for contact information
  const contactData = {
    sectionTitle: {
      title: "Contact",
      description: "Necessitatibus eius consequatur",
    },
    contactInfo: [
      {
        icon: "bi bi-geo-alt",
        title: "Address",
        description: "A108 Adam Street, New York, NY 535022",
      },
      {
        icon: "bi bi-telephone",
        title: "Call Us",
        description: "+1 5589 55488 55",
      },
      {
        icon: "bi bi-envelope",
        title: "Email Us",
        description: "info@example.com",
      },
    ],
  };

  return (
    <section id="contact" className="contact section dark-background">
      <div
        className="container section-title aos-init aos-animate"
        data-aos="fade-up"
      >
        <h2>{contactData.sectionTitle.title}</h2>
        <p>{contactData.sectionTitle.description}</p>
      </div>

      <div
        className="container aos-init aos-animate"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <div className="row gy-4">
          <div className="col-lg-6">
            <div className="row gy-4">
              {/* Map through contactInfo to render contact details */}
              {contactData.contactInfo.map((info, index) => (
                <div
                  key={index}
                  className={`col-lg-${index === 0 ? "12" : "6"}`}
                >
                  <div
                    className="info-item d-flex flex-column justify-content-center align-items-center aos-init aos-animate"
                    data-aos="fade-up"
                    data-aos-delay={`${200 + index * 100}`}
                  >
                    <i className={info.icon}></i>
                    <h3>{info.title}</h3>
                    <p>{info.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-6">
            <form
              className="php-email-form aos-init aos-animate"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <div className="row gy-4">
                <div className="col-md-6">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Your Email"
                    required
                  />
                </div>
                <div className="col-md-12">
                  <input
                    type="text"
                    name="subject"
                    className="form-control"
                    placeholder="Subject"
                    required
                  />
                </div>
                <div className="col-md-12">
                  <textarea
                    name="message"
                    rows="4"
                    className="form-control"
                    placeholder="Message"
                    required
                  ></textarea>
                </div>
                <div className="col-md-12 text-center">
                  <button type="submit">Send Message</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}