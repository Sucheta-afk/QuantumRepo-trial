import { Repository } from "@/app/dashboard/repositories/page";

type RepositoryCardProps = {
  repo: Repository;
};

export default function RepositoryCard({ repo }: RepositoryCardProps) {
  return (
    <div className="bg-gray-800 p-6 rounded shadow hover:bg-gray-700 transition">
      <h2 className="text-xl font-bold text-blue-400">{repo.name}</h2>
      <p className="text-gray-400 mt-1">{repo.description}</p>
      <div className="mt-4 flex items-center justify-between text-gray-500 text-sm">
        <span>{repo.language}</span>
        <span>Updated {repo.updatedAt}</span>
      </div>
    </div>
  );
}
