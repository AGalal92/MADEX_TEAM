import React from 'react';
import Image from 'next/image';

const Team = () => {
  // Dummy JSON data for team members
  const teamMembers = [
    {
      id: 1,
      image: '/assets/images/team-1.jpg',
      name: 'Walter White',
      position: 'Chief Executive Officer',
      socialLinks: [
        { icon: 'bi bi-twitter-x', url: '#' },
        { icon: 'bi bi-facebook', url: '#' },
        { icon: 'bi bi-instagram', url: '#' },
        { icon: 'bi bi-linkedin', url: '#' },
      ],
    },
    {
      id: 2,
      image: '/assets/images/team-2.jpg',
      name: 'Sarah Jhonson',
      position: 'Product Manager',
      socialLinks: [
        { icon: 'bi bi-twitter-x', url: '#' },
        { icon: 'bi bi-facebook', url: '#' },
        { icon: 'bi bi-instagram', url: '#' },
        { icon: 'bi bi-linkedin', url: '#' },
      ],
    },
    {
      id: 3,
      image: '/assets/images/team-3.jpg',
      name: 'William Anderson',
      position: 'CTO',
      socialLinks: [
        { icon: 'bi bi-twitter-x', url: '#' },
        { icon: 'bi bi-facebook', url: '#' },
        { icon: 'bi bi-instagram', url: '#' },
        { icon: 'bi bi-linkedin', url: '#' },
      ],
    },
  ];

  return (
    <section id="team" className="team section dark-background">
      <div className="container section-title aos-init aos-animate" data-aos="fade-up">
        <h2>Team</h2>
        <p>CHECK OUR TEAM</p>
      </div>

      <div className="container">
        <div className="row gy-5">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="col-lg-4 col-md-6 aos-init aos-animate"
              data-aos="fade-up"
              data-aos-delay={100 * member.id}
            >
              <div className="member">
                <div className="pic">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={400}
                    height={400}
                    className="img-fluid"
                  />
                </div>
                <div className="member-info">
                  <h4>{member.name}</h4>
                  <span>{member.position}</span>
                  <div className="social">
                    {member.socialLinks.map((link, index) => (
                      <a key={index} href={link.url}>
                        <i className={link.icon}></i>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;