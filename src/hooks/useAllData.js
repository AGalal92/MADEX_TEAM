// hooks/useAllData.js
import { useCrud } from './useCrud';

export const useAllData = () => {
  // Fetch data for all endpoints using useCrud
  const { data: aboutData, loading: aboutLoading, error: aboutError } = useCrud('abouts');
  const { data: servicesData, loading: servicesLoading, error: servicesError } = useCrud('services');
  const { data: worksData, loading: worksLoading, error: worksError } = useCrud('works');
  const { data: worksCategoryData, loading: worksCategoryLoading, error: worksCategoryError } = useCrud('work-categories');
  const { data: teamData, loading: teamLoading, error: teamError } = useCrud('team');
  const { data: contactData, loading: contactLoading, error: contactError } = useCrud('contact-us');

  // Combine loading and error states
  const loading = aboutLoading || servicesLoading || worksLoading || worksCategoryLoading || teamLoading || contactLoading;
  const error = aboutError || servicesError || worksError || worksCategoryError || teamError || contactError;

  // Combine all data into a single object
  const allData = {
    aboutData,
    servicesData,
    worksData,
    worksCategoryData,
    teamData,
    contactData,
  };

  return { allData, loading, error };
};