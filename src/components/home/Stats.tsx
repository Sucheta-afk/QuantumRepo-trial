import { useEffect, useState } from "react";

const StatsSection = () => {
  const [developerCount, setDeveloperCount] = useState(0);
  const [repoCount, setRepoCount] = useState(0);
  const [commitCount, setCommitCount] = useState(0);

  useEffect(() => {
    const incrementValues = () => {
      setDeveloperCount((prev) => (prev < 1000 ? prev + 20 : 1000));
      setRepoCount((prev) => (prev < 20000 ? prev + 400 : 20000));
      setCommitCount((prev) => (prev < 100000 ? prev + 2000 : 100000));
    };
    const interval = setInterval(incrementValues, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="p-10 md:p-20 bg-gray-900 text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-12 text-blue-400 drop-shadow-md">
          Repo by the Numbers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          <div className="p-6 md:p-8 bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-5xl md:text-6xl font-extrabold text-green-500 mb-4">{developerCount}+</h3>
            <p className="text-lg md:text-xl text-gray-300 font-medium">Developers</p>
          </div>
          <div className="p-6 md:p-8 bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-5xl md:text-6xl font-extrabold text-green-500 mb-4">{repoCount.toLocaleString()}+</h3>
            <p className="text-lg md:text-xl text-gray-300 font-medium">Repositories</p>
          </div>
          <div className="p-6 md:p-8 bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-5xl md:text-6xl font-extrabold text-green-500 mb-4">{commitCount.toLocaleString()}+</h3>
            <p className="text-lg md:text-xl text-gray-300 font-medium">Commits per day</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
