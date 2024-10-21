import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-[#0b0d10] to-black min-h-screen text-white">
      {/* Header Section */}
      <section className="py-20 text-center">
        <h1 className="text-6xl font-extrabold leading-tight">
          QuantumRepo: <br />
          <span className="text-purple-400">
            The upgrade GitHub could only dream about!
          </span>
        </h1>
        <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
          Optimized for productivity ✨. Reimagined for industry-scale
          collaboration.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none w-72"
          />
          <Button className="px-6 py-2 bg-purple-600 hover:bg-purple-700">
            Sign Up
          </Button>
        </div>
      </section>

      {/* Code Example Section */}
      <section className="py-16 px-8 bg-gray-900">
        <div className="text-center">
          <h2 className="text-4xl font-semibold mb-8">
            Supercharge high-quality software development.
          </h2>
        </div>

        <div className="flex justify-center">
          <div className="bg-gray-800 p-6 rounded-md w-full max-w-3xl">
            <pre className="text-left text-white">
              {`// Sample Code
function QuantumRepo() {
  console.log("Welcome to QuantumRepo!");
}`}
            </pre>
          </div>
        </div>

        <p className="text-center text-green-400 mt-6 text-2xl">
          22% increase in developer productivity 🛠️
        </p>
      </section>

      {/* Collaboration Section */}
      <section className="py-16 px-8">
        <h2 className="text-4xl font-semibold text-center mb-8">
          Supercharge collaboration.
        </h2>
        <div className="overflow-auto">
          <table className="w-full table-auto border-collapse border border-gray-700">
            <thead>
              <tr className="bg-gray-800">
                <th className="border border-gray-700 px-4 py-2">Project</th>
                <th className="border border-gray-700 px-4 py-2">Owner</th>
                <th className="border border-gray-700 px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-700 px-4 py-2">
                  QuantumRepo Backend
                </td>
                <td className="border border-gray-700 px-4 py-2">Alice</td>
                <td className="border border-gray-700 px-4 py-2">
                  In Progress
                </td>
              </tr>
              <tr>
                <td className="border border-gray-700 px-4 py-2">UI Revamp</td>
                <td className="border border-gray-700 px-4 py-2">Bob</td>
                <td className="border border-gray-700 px-4 py-2">Completed</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-center text-green-400 mt-6 text-2xl">
          80% reduction in review time ⏲️
        </p>
      </section>

      {/* Footer Section */}
      <footer className="py-12 text-center bg-gray-900">
        <h3 className="text-3xl font-semibold">
          56 million projects... and counting 🚀
        </h3>
        <Button className="mt-6 px-8 py-3 bg-purple-600 hover:bg-purple-700">
          Explore Now
        </Button>
      </footer>
    </main>
  );
}
