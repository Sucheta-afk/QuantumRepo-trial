import { FaCodeBranch, FaLock, FaUsers } from 'react-icons/fa';

const features = [
  {
    title: "Collaboration",
    description: "Work together on the same codebase with unlimited repositories.",
    icon: FaUsers,
  },
  {
    title: "Security",
    description: "Secure your code with industry-standard encryption and security practices.",
    icon: FaLock,
  },
  {
    title: "Version Control",
    description: "Track every change to your code with Repo version control.",
    icon: FaCodeBranch,
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gray-900 rounded">
      <div className="container mx-auto px-4 lg:px-8 rounded">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-green-400 mb-12 drop-shadow-md">
          QuantumRepo Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-gray-800 p-8 rounded-xl shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-2xl"
            >
              <feature.icon className="text-green-500 text-5xl mb-6" />
              <h3 className="text-2xl font-semibold mb-4 text-white">{feature.title}</h3>
              <p className="text-gray-300 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
