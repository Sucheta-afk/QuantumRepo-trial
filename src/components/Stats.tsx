const StatsSection = () => {
    return (
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Repo by the Numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-5xl font-bold text-green-500">1K+</h3>
              <p className="text-lg text-gray-600">Developers</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold text-green-500">20K+</h3>
              <p className="text-lg text-gray-600">Repositories</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold text-green-500">100K+</h3>
              <p className="text-lg text-gray-600">Commits per day</p>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default StatsSection;
  