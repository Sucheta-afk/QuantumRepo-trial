"use client";

import { useEffect, useState, useRef } from "react";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";

const PricingPage = () => {
  const pricingRef = useRef(null);
  const [isPricingVisible, setPricingVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === "pricing") {
            setPricingVisible(entry.isIntersecting);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (pricingRef.current) observer.observe(pricingRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="bg-gradient-to-tr from-gray-900 via-black to-gray-800 w-full h-full"></div>
      </div>

      {/* Header */}
      <div className="relative z-50">
        <Header />
      </div>

      <main className="relative z-10 pt-16">
        <section
          id="pricing"
          ref={pricingRef}
          className={`min-h-screen flex flex-col items-center justify-center text-center transition-all duration-700 transform ${
            isPricingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-neon-green mb-6">
            Pricing Plans
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mb-12">
            Choose a plan that fits your needs and scale your projects with ease. Whether you&apos;re a solo developer or part of a team, we have the perfect plan for you.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-12">
            {/* Pricing Cards */}
            <div className="bg-gray-700 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-bold text-neon-green mb-4">Free</h2>
              <p className="text-gray-300 mb-6">Perfect for hobbyists and small projects.</p>
              <ul className="text-gray-400 mb-6 space-y-2">
                <li>✔ 5 Private Repositories</li>
                <li>✔ Basic Collaboration Tools</li>
                <li>✔ Community Support</li>
              </ul>
              <button className="bg-neon-green text-black py-2 px-4 rounded-md font-semibold hover:bg-green-500">
                Get Started
              </button>
            </div>
            <div className="bg-gray-700 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-bold text-neon-green mb-4">Pro</h2>
              <p className="text-gray-300 mb-6">For growing teams and advanced projects.</p>
              <ul className="text-gray-400 mb-6 space-y-2">
                <li>✔ 50 Private Repositories</li>
                <li>✔ Advanced Collaboration Tools</li>
                <li>✔ Email Support</li>
              </ul>
              <button className="bg-neon-green text-black py-2 px-4 rounded-md font-semibold hover:bg-green-500">
                Upgrade Now
              </button>
            </div>
            <div className="bg-gray-700 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-bold text-neon-green mb-4">Enterprise</h2>
              <p className="text-gray-300 mb-6">Tailored solutions for large organizations.</p>
              <ul className="text-gray-400 mb-6 space-y-2">
                <li>✔ Unlimited Repositories</li>
                <li>✔ Dedicated Account Manager</li>
                <li>✔ Priority Support</li>
              </ul>
              <button className="bg-neon-green text-black py-2 px-4 rounded-md font-semibold hover:bg-green-500">
                Contact Sales
              </button>
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

export default PricingPage;
