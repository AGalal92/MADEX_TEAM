'use client';
import DashboardHeader from '../components/DashboardHeader';
import Hero from '../components/Hero';
import About from '../components/About.jsx';
import Stats from '../components/Stats';
import FeaturedServices from '../components/FeaturedServices';
import Clients from '../components/Clients';
import Features from '../components/Features';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import Portfolio from '../components/Portfolio';
import Team from '../components/Team';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '../utils/auth';
import ECommerce from "../components/Dashboard/E-commerce";
import DefaultLayout from "../components/Layouts/DefaultLayout";
import Loader from "../components/common/Loader";
import { useAllData } from '../hooks/useAllData';

export default function Home() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state

  // Fetch all data using the custom hook
  const { allData, loading: dataLoading, error: dataError } = useAllData();

  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      const authStatus = await isAuthenticated();
      setAuthenticated(authStatus);
      setLoading(false); // Set loading to false after authentication check
    };

    checkAuth();

    // Dynamically import AOS
    import('aos').then((AOS) => {
      AOS.init({ duration: 1000 });
    });

    // Dynamically import GLightbox
    import('glightbox').then((GLightbox) => {
      GLightbox.default({
        selector: '.glightbox',
      });
    });

    // Dynamically import PureCounter
    import('@srexi/purecounterjs').then((PureCounter) => {
      new PureCounter.default();
    });
  }, [router]);

  // Show a loading spinner while checking authentication or fetching data
  if (loading || dataLoading) {
    return <Loader />;
  }

  // Show error message if data fetching fails
  if (dataError) {
    return <p className="text-center text-danger">Error: {dataError}</p>;
  }

  // Show ECommerce dashboard if authenticated
  if (authenticated) {
    return (
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    );
  }

  // Show landing page if not authenticated
  return (
    <>
      <DashboardHeader />
      <Hero />

      {/* About Section */}
      <About about={allData.aboutData} />

      {/* Stats Section */}
      {/* <Stats /> */}

      {/* Featured Services Section */}
      {/* <FeaturedServices /> */}

      {/* Clients Section */}
      {/* <Clients /> */}

      {/* Features Section */}
      <Features services={allData.servicesData} />

      {/* Portfolio Section */}
      <Portfolio
        category={allData.worksCategoryData} // Pass worksCategoryData as the category prop
        project={allData.workProjectData} // Pass workProjectData as the project prop
      />

      {/* Team Section */}
      <Team team={allData.teamData} />

      {/* Contact Section */}
      <Contact contact={allData.contactData} />

      <Footer />
      <ScrollToTop />
    </>
  );
}