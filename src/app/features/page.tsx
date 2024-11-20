"use client";

import { useEffect, useState, useRef } from "react";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";

const FeaturesPage = () => {
  const featuresRef = useRef(null);
  const [isFeaturesVisible, setFeaturesVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === "features") {
            setFeaturesVisible(entry.isIntersecting);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (featuresRef.current) observer.observe(featuresRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="bg-gradient-to-br from-black via-gray-900 to-gray-800 w-full h-full"></div>
      </div>

      {/* Header */}
      <div className="relative z-50">
        <Header />
      </div>

      <main className="relative z-10 pt-16">
        <section
          id="features"
          ref={featuresRef}
          className={`min-h-screen flex flex-col items-center justify-center text-center transition-all duration-700 transform ${
            isFeaturesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-neon-green mb-6">
            Features
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mb-12">
            Discover the groundbreaking tools and services that QuantumRepo offers to simplify your development journey.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-12">
            <div className="bg-gray-700 rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-bold text-neon-green mb-4">
                Collaboration Tools
              </h2>
              <p className="text-gray-300">
                Seamlessly collaborate with your team using advanced project management and communication features.
              </p>
            </div>
            <div className="bg-gray-700 rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-bold text-neon-green mb-4">
                Secure Repositories
              </h2>
              <p className="text-gray-300">
                Ensure your projects are safe with top-notch encryption and access control.
              </p>
            </div>
            <div className="bg-gray-700 rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-bold text-neon-green mb-4">
                AI Assistance
              </h2>
              <p className="text-gray-300">
                Use AI to write, debug, and review your code faster and with greater accuracy.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default FeaturesPage;
