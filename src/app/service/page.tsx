"use client";

import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";

const TermsOfService = () => {
  return (
    <div className="tos-background relative min-h-screen text-white overflow-hidden">
      {/* Fixed Header */}
      <div className="relative z-50">
        <Header />
      </div>
      <main className="relative z-10 pt-16 px-6 lg:px-20 max-w-6xl mx-auto space-y-8">
        <section className="text-center">
          <h1 className="text-4xl font-bold">Terms of Service</h1>
          <p className="text-gray-400 mt-2">Last Updated: November 20, 2024</p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
          <p className="text-gray-300">
            By using our website, you agree to comply with and be bound by these terms. If you do not agree, you may not access or use our services.
          </p>

          <h2 className="text-2xl font-semibold">2. Use of the Site</h2>
          <p className="text-gray-300">
            You are responsible for all activities that occur under your account. You agree to use the site for lawful purposes only.
          </p>

          <h2 className="text-2xl font-semibold">3. Intellectual Property</h2>
          <p className="text-gray-300">
            All content on this site is the property of [Your Company Name]. Unauthorized use is prohibited.
          </p>

        </section>
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default TermsOfService;
