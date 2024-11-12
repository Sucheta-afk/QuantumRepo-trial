import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 z-10">
        <Image 
          src="/assets/hero-bg.png" 
          alt="Hero Background" 
          layout="fill" 
          objectFit="cover" 
          className="opacity-60" 
        />
      </div>
      <div className="relative z-20 text-center max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-bold text-green-500">
          Where the world builds software
        </h1>
        <p className="text-xl text-gray-200 mt-6">
          Millions of developers and companies build, ship, and maintain their software on QuantumRepo on one of the most advanced development platform in the world.
        </p>
        <a href="/signup" className="inline-block mt-8 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
          Sign Up for QuantumRepo
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
