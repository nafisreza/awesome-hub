import Link from "next/link";
import { GitHubRepo } from "@/lib/github";
import { BookOpen, Star, GitFork } from 'lucide-react';

interface Props {
  repo: GitHubRepo;
}

export default function RepoSidebarAbout({ repo }: Props) {
  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 space-y-4  text--gray-700 shadow-sm">
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3">About</h2>

      {/* Description */}
      {repo.description && (
        <p className="text-gray-700 text-sm sm:text-base md:text-lg flex items-start gap-2">
          <span>{repo.description}</span>
        </p>
      )}

      {/* Topics */}
      <div className="flex flex-wrap gap-2 mt-3">
        {repo.topics?.map((topic) => (
          <span
            key={topic}
            className="bg-gray-700 text-gray-200 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium hover:bg-gray-600 transition-colors"
          >
            {topic}
          </span>
        ))}
      </div>

      <hr className="border-gray-600 my-4" />

      {/* Info Links and Stats */}
      <div className="space-y-3 text-sm sm:text-base">
        {/* Readme Link */}
        <div className="flex items-center gap-2 text-gray-700 hover:text-blue-400 transition-colors">
          <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
          <Link
            href={`https://github.com/${repo.owner.login}/${repo.name}?tab=readme-ov-file#readme`}
            className="hover:underline truncate"
          >
            Readme
          </Link>
        </div>

        <hr className="border-gray-600 my-4" />

        {/* Stars */}
        <div className="flex items-center gap-2 text-gray-700">
          <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
          <span className="font-medium">{repo.stargazers_count.toLocaleString()} stars</span>
        </div>

        {/* Forks */}
        <div className="flex items-center gap-2 text-gray-700">
          <GitFork className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
          <span className="font-medium">{repo.forks_count.toLocaleString()} forks</span>
        </div>
      </div>
    </div>
  );
}
