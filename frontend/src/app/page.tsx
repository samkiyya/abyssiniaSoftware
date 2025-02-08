import InteractiveScroll from "@/components/Animation/InteractiveScroll";
import BlogSection from "@/components/Blog/BlogSection";
import CompaniesState from "@/components/Companies/CompaniesState";
import ContactUsForm from "@/components/ContactUs/ContactUsSection";
import FaqSection from "@/components/Faq/FaqSection";
// import Hero from "@/components/Hero/Hero";
import Partners from "@/components/Partners/Partners";
import PortfolioSection from "@/components/Portfolio/PortfolioSection";
import Pricing from "@/components/Pricing/Pricing";
import Services from "@/components/Service/Services";
import HeroSlider from "@/components/Slider/HeroSlider";
import Testimonials from "@/components/Testimonials/Testimonials";
import { WhyChooseUs } from "@/components/WhyChooseUs/WhyChooseUs";
import {
  getProjectCategories,
  getProjects,
} from "@/lib/services/project.service";

export default async function Home() {
  const categories = await getProjectCategories();
  const projects = await getProjects();
  return (
    <>
      <InteractiveScroll>
        <HeroSlider />
        {/* <div className="relative">
          <Hero />
        </div> */}
        <Services title="Our Services" length={6} />
        <WhyChooseUs />
        <PortfolioSection
          categories={categories}
          projects={projects}
          length={6}
        />
        <Pricing />
        <Partners />
        <CompaniesState />
        <Testimonials />
        <FaqSection />
        <BlogSection />
        <ContactUsForm />
      </InteractiveScroll>
    </>
  );
}
