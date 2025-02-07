import React from 'react';
import Image from 'next/image';

const Team = ({ team }) => {

  const STORAGE_BASE_URL = 'http://localhost:5001/storage'; // Base URL for the images

  if (!team || team.length === 0) {
    return <p>Loading...</p>; // Display a loading state if no data is passed
  }

  return (
    <section id="team" className="team section dark-background">
      <div className="container section-title" data-aos="fade-up">
        <h2>Team</h2>
        <p>CHECK OUR TEAM</p>
      </div>

      <div className="container">
        <div className="row gy-5">
          {team.map((member) => {
            // Parse the stringified social_links field
            const socialLinks = (() => {
              try {
                return JSON.parse(member.social_links || '[]');
              } catch (error) {
                console.error('Error parsing social_links:', error);
                return [];
              }
            })();

            return (
              <div
                key={member.id}
                className="col-lg-4 col-md-6"
                data-aos="fade-up"
                data-aos-delay={100 * member.id}
              >
                <div className="member">
                  <div className="pic ml-1">
                    <Image
                      src={`${STORAGE_BASE_URL}/${member.image}`} // Construct the full image URL
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
                      {/* {socialLinks.map((link, index) => (
                        <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
                          <i className={link.icon}></i>
                        </a>
                      ))} */}
                      {member.social_links.map((link, index) => (
                        <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
                          <i className={`bi ${link.icon}`} style={{ fontSize: '1.2rem', marginRight: '8px' }}></i>
                        </a>
                      ))}
                  
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Team;
