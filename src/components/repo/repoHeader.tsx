import { GitHubRepo } from '@/lib/github';
import Image from 'next/image';
import { Heart, GitFork, Star } from 'lucide-react';
import Link from 'next/link';

interface Props {
  repo: GitHubRepo;
}

export default function RepoActionBar({ repo }: Props) {
  const formatCount = (count: number) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'k';
    }
    return count.toLocaleString();
  };

  return (
    <div className="bg-card my-6 flex flex-col justify-between gap-4 rounded-xl border px-6 py-4 md:flex-row md:items-center md:gap-0">
      {/* Left Side: Avatar & Repo Info */}
      <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center md:gap-3">
        <Image src={repo.owner.avatar_url} alt={repo.owner.login} width={40} height={40} className="rounded-full" />

        <div className="flex flex-col gap-1 truncate sm:flex-row sm:items-center sm:gap-2">
          <h1 className="truncate text-lg font-semibold sm:text-xl md:text-2xl">
            <Link href={repo.owner.html_url} className="truncate hover:text-blue-600">
              {repo.owner.login}
            </Link>
            <span className="mx-1">/</span>
            <Link href={repo.html_url} className="truncate hover:text-blue-600">
              {repo.name}
            </Link>
          </h1>

          {/* Public Badge */}
          <span className="text-muted-foreground border-border w-fit rounded-full border px-2 py-0.5 text-xs font-medium whitespace-nowrap">
            Public
          </span>
        </div>
      </div>

      {/* Right Side: Action Buttons */}
      <div className="flex w-full flex-wrap justify-start gap-2 sm:gap-3 md:w-auto md:flex-nowrap md:justify-end md:gap-2">
        {/* Sponsor Button */}
        <button className="flex items-center gap-1 rounded-lg border border-gray-700 bg-[#21262D] px-3 py-1.5 text-sm text-white transition-colors hover:border-gray-500 sm:text-base">
          <Heart className="h-4 w-4 text-pink-400" />
          Sponsor
        </button>

        {/* Fork Button Group */}
        <div className="flex overflow-hidden rounded-lg border border-gray-700 text-sm text-white sm:text-base">
          <button className="flex items-center gap-1 bg-[#21262D] px-3 py-1.5 transition-colors hover:bg-[#30363D]">
            <GitFork className="h-4 w-4" />
            Fork
          </button>
          <button className="border-l border-gray-700 bg-[#21262D] px-2 py-1.5 transition-colors hover:bg-[#30363D]">
            {formatCount(repo.forks_count)}
          </button>
        </div>

        {/* Star Button Group */}
        <div className="flex overflow-hidden rounded-lg border border-gray-700 text-sm sm:text-base">
          <button className="flex items-center gap-1 bg-[#21262D] px-3 py-1.5 text-white transition-colors hover:bg-[#30363D]">
            <Star className="h-4 w-4 text-yellow-400" />
            Star
          </button>
          <button className="border-l border-gray-700 bg-[#21262D] px-2 py-1.5 text-white transition-colors hover:bg-[#30363D]">
            {formatCount(repo.stargazers_count)}
          </button>
        </div>
      </div>
    </div>
  );
}
