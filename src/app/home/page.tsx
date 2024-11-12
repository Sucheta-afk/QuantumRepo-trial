"use client";

import { useEffect, useState, useRef } from "react";
import Header from "@/components/home/Header";
import HeroSection from "@/components/home/Hero";
import FeaturesSection from "@/components/home/Features";
import StatsSection from "@/components/home/Stats";
import Footer from "@/components/home/Footer";
import Image from "next/image";

const HomePage = () => {
  const [activeSection, setActiveSection] = useState<number>(0);

  // Refs to track the visibility of sections
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const statsRef = useRef(null);

  const [isHeroVisible, setHeroVisible] = useState(false);
  const [isFeaturesVisible, setFeaturesVisible] = useState(false);
  const [isStatsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    // Intersection Observer for each section
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.target.id === "hero") {
          setHeroVisible(entry.isIntersecting);
        } else if (entry.target.id === "features") {
          setFeaturesVisible(entry.isIntersecting);
        } else if (entry.target.id === "stats") {
          setStatsVisible(entry.isIntersecting);
        }
      });
    }, { threshold: 0.5 });

    // Observe each section
    if (heroRef.current) observer.observe(heroRef.current);
    if (featuresRef.current) observer.observe(featuresRef.current);
    if (statsRef.current) observer.observe(statsRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-background relative min-h-screen text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/galaxy-background.jpg"
          alt="Hero Background"
          fill
          style={{ objectFit: 'cover' }}
          className="opacity-50"
        />
      </div>

      {/* Fixed Header */}
      <div className="relative z-50">
        <Header />
      </div>
      <main className="relative z-10 pt-16"> {/* Added padding to account for fixed header */}
        <div
          id="hero"
          ref={heroRef}
          className={`h-screen flex items-center justify-center text-center transition-all duration-700 transform ${isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <HeroSection />
        </div>
        <div
          id="features"
          ref={featuresRef}
          className={`h-screen flex items-center justify-center text-center transition-all duration-700 transform ${isFeaturesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <FeaturesSection />
        </div>
        <div
          id="stats"
          ref={statsRef}
          className={`h-screen flex items-center justify-center text-center transition-all duration-700 transform ${isStatsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <StatsSection />
        </div>
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
