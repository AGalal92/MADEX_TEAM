'use client'; // Mark as a client component for interactivity

import Image from 'next/image';

export default function Clients() {
  // Clients data
  const clients = [
    { id: 1, logo: '/assets/images/client-1.png' },
    { id: 2, logo: '/assets/images/client-2.png' },
    { id: 3, logo: '/assets/images/client-3.png' },
    { id: 4, logo: '/assets/images/client-4.png' },
    { id: 5, logo: '/assets/images/client-5.png' },
    { id: 6, logo: '/assets/images/client-6.png' },
  ];

  return (
    <section id="clients" className="clients section dark-background">
      <div className="container aos-init aos-animate" data-aos="fade-up">
        <div className="row gy-4">
          {clients.map((client) => (
            <div key={client.id} className="col-xl-2 col-md-3 col-6 client-logo">
              <Image
                src={client.logo} // Update the path to your image
                alt={`Client ${client.id}`}
                width={150} // Adjust as needed
                height={100} // Adjust as needed
                className="img-fluid"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}