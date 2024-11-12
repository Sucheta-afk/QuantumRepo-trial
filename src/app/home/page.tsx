// src/app/home/page.tsx
"use client"; 

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/Hero';
import FeaturesSection from '@/components/Features';
import StatsSection from '@/components/Stats';
import Footer from '@/components/Footer';

const sections = [
  { id: 'hero', accentColor: 'bg-green-500' },
  { id: 'features', accentColor: 'bg-blue-500' },
  { id: 'stats', accentColor: 'bg-purple-500' },
];

const HomePage = () => {
  const [activeSection, setActiveSection] = useState<number>(0);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const sectionHeight = window.innerHeight;
    const newActiveSection = Math.min(Math.floor(scrollY / sectionHeight), sections.length - 1);
    setActiveSection(newActiveSection);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home-background relative min-h-screen text-white">
      {/* Vertical Animated Line */}
      <div
        className={`absolute top-0 left-0 h-full w-[4px] transition-all duration-300 ${sections[activeSection]?.accentColor}`}
        style={{
          transform: `translateY(${activeSection * (100 / sections.length)}%)`,
        }}
      />

      <Header />
      <main>
        <div id="hero" className="h-screen flex items-center justify-center text-center">
          <HeroSection />
        </div>
        <div id="features" className="h-screen flex items-center justify-center text-center">
          <FeaturesSection />
        </div>
        <div id="stats" className="h-screen flex items-center justify-center text-center">
          <StatsSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
