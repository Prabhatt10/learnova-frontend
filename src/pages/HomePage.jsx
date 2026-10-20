import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import FaqSection from '../components/home/FaqSection';
import ContactSection from '../components/home/ContactSection';

function HomePage() {
  return (
    <div className="w-full bg-[#F5F1F1] font-[poppins]">
      <HeroSection />
      <FeaturesSection />
      <FaqSection />
      <ContactSection />
    </div>
  );
}

export default HomePage;
