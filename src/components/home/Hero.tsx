import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center w-full px-4 sm:px-6 lg:px-8">
      {/* Content */}
      <div className="relative z-20 text-center max-w-3xl sm:max-w-4xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-green-400 drop-shadow-md animate-fadeInUp">
          Where the World Builds Software
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mt-4 sm:mt-6 md:mt-8 leading-relaxed animate-fadeIn delay-200">
          Millions of developers and companies build, ship, and maintain their software on QuantumRepo, one of the world’s most advanced development platforms.
        </p>
        <Link href="/auth/register" className="inline-block mt-8 sm:mt-10 px-6 sm:px-8 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600 transition transform hover:-translate-y-1 hover:shadow-xl animate-fadeIn delay-500">
            Sign Up for QuantumRepo
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
