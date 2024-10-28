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
    description: "Track every change to your code with Git version control.",
    icon: FaCodeBranch,
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">GitHub Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-800 p-8 rounded-lg shadow-lg">
              <feature.icon className="text-green-500 text-4xl mb-6 mx-auto" />
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-200">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
