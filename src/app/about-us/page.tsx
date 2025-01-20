import Calendar from "@/components/About-us";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "About us Page",
  description:
    "this is About us Page for MADEX TEAM",
};

const AboutPage = () => {
  return (
    <DefaultLayout>
      <Calendar />
    </DefaultLayout>
  );
};

export default AboutPage;
