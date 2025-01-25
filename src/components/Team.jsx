import React from 'react';
import Image from 'next/image';

const Team = ({ team }) => {
  if (!team || team.length === 0) {
    return <p>Loading...</p>; // Display a loading state if no data is passed
  }

  return (
    <section id="team" className="team section dark-background">
      <div className="container section-title aos-init aos-animate" data-aos="fade-up">
        <h2>Team</h2>
        <p>CHECK OUR TEAM</p>
      </div>

      <div className="container">
        <div className="row gy-5">
          {team.map((member) => (
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
                    {member.social_links.map((link, index) => (
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
