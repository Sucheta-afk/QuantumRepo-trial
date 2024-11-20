"use client";

import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-background relative min-h-screen text-white overflow-hidden">
      {/* Fixed Header */}
      <div className="relative z-50">
        <Header />
      </div>
      <main className="relative z-10 pt-16 px-6 lg:px-20 max-w-6xl mx-auto space-y-8">
        <section className="text-center">
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <p className="text-gray-400 mt-2">Last Updated: November 20, 2024</p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
          <p className="text-gray-300">
            We collect personal information you provide, such as your name, email address, and any other details submitted through our website.
          </p>

          <h2 className="text-2xl font-semibold">2. How We Use Your Information</h2>
          <p className="text-gray-300">
            Your data is used to provide and improve our services, communicate with you, and ensure compliance with applicable laws.
          </p>

          <h2 className="text-2xl font-semibold">3. Sharing Your Information</h2>
          <p className="text-gray-300">
            We do not share your personal data with third parties except as necessary to fulfill our services or comply with legal obligations.
          </p>

          <h2 className="text-2xl font-semibold">4. Your Rights</h2>
          <p className="text-gray-300">
            You have the right to access, update, or delete your information at any time. Please contact us for assistance.
          </p>

        </section>
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default PrivacyPolicy;
