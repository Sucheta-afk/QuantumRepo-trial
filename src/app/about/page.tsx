"use client";

import { useEffect, useState, useRef } from "react";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";

const AboutPage = () => {
  const [isMissionVisible, setMissionVisible] = useState(false);
  const [isVisionVisible, setVisionVisible] = useState(false);
  const [isTeamVisible, setTeamVisible] = useState(false);

  const missionRef = useRef(null);
  const visionRef = useRef(null);
  const teamRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === "mission") {
            setMissionVisible(entry.isIntersecting);
          } else if (entry.target.id === "vision") {
            setVisionVisible(entry.isIntersecting);
          } else if (entry.target.id === "team") {
            setTeamVisible(entry.isIntersecting);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (missionRef.current) observer.observe(missionRef.current);
    if (visionRef.current) observer.observe(visionRef.current);
    if (teamRef.current) observer.observe(teamRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="bg-gradient-to-bl from-gray-900 via-black to-gray-800 w-full h-full"></div>
      </div>

      <div className="relative z-50">
        <Header />
      </div>

      <main className="relative z-10 pt-16">
        {/* Mission Section */}
        <section
          id="mission"
          ref={missionRef}
          className={`min-h-screen flex flex-col items-center justify-center text-center transition-all duration-700 transform ${
            isMissionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-neon-green mb-6">Our Mission</h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mb-12">
            Our mission is to drive innovation by developing cutting-edge technologies that empower individuals and businesses.
          </p>
        </section>

        {/* Vision Section */}
        <section
          id="vision"
          ref={visionRef}
          className={`min-h-screen flex flex-col items-center justify-center text-center transition-all duration-700 transform ${
            isVisionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-neon-green mb-6">Our Vision</h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mb-12">
            Our vision is to be a global leader in creating breakthrough solutions that enhance productivity and improve lives.
          </p>
        </section>

        {/* Team Section */}
        <section
          id="team"
          ref={teamRef}
          className={`min-h-screen flex flex-col items-center justify-center text-center transition-all duration-700 transform ${
            isTeamVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-neon-green mb-6">Meet Our Team</h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mb-12">
            Our team consists of passionate innovators, experienced professionals, and forward-thinking leaders.
          </p>

          {/* Team Members */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-12">
            <div className="bg-gray-700 rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-bold text-neon-green mb-4">Sumit S Nair</h2>
              <p className="text-gray-300">Product Owner</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-bold text-neon-green mb-4">Sohil N S</h2>
              <p className="text-gray-300">Web Development Lead</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-bold text-neon-green mb-4">Sucheta R S</h2>
              <p className="text-gray-300">Engineering Director</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-bold text-neon-green mb-4">Varalakshmi</h2>
              <p className="text-gray-300">UI/UX Lead</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
