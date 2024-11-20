"use client";

import { useEffect, useState, useRef } from "react";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";

const ExplorePage = () => {
  const exploreRef = useRef(null);
  const [isExploreVisible, setExploreVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === "explore") {
            setExploreVisible(entry.isIntersecting);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (exploreRef.current) observer.observe(exploreRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="bg-gradient-to-bl from-gray-900 via-black to-gray-800 w-full h-full"></div>
      </div>

      <div className="relative z-50">
        <Header />
      </div>

      <main className="relative z-10 pt-16">
        <section
          id="explore"
          ref={exploreRef}
          className={`min-h-screen flex flex-col items-center justify-center text-center transition-all duration-700 transform ${
            isExploreVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-neon-green mb-6">
            Explore QuantumRepo
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mb-12">
            Explore the vast ecosystem of projects, resources, and opportunities within QuantumRepo.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-12">
            <div className="bg-gray-700 rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-bold text-neon-green mb-4">
                Community Projects
              </h2>
              <p className="text-gray-300">
                Discover open-source projects and collaborate with a global developer community.
              </p>
            </div>
            <div className="bg-gray-700 rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-bold text-neon-green mb-4">
                Developer Tools
              </h2>
              <p className="text-gray-300">
                Access powerful tools to accelerate your workflow and productivity.
              </p>
            </div>
            <div className="bg-gray-700 rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-bold text-neon-green mb-4">
                Learning Resources
              </h2>
              <p className="text-gray-300">
                Sharpen your skills with expert-led tutorials and resources.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ExplorePage;
