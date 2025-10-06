import { GitHubRepo } from "@/lib/github";
import Image from "next/image";
import { Heart, GitFork, Star } from "lucide-react"; 
import Link from "next/link";

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
    <div className="py-4 px-6 flex flex-col md:flex-row md:items-center justify-between rounded-xl bg-card border my-6 gap-4 md:gap-0">
      
      {/* Left Side: Avatar & Repo Info */}
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 w-full md:w-auto">
        <Image
          src={repo.owner.avatar_url}
          alt={repo.owner.login}
          width={40}
          height={40}
          className="rounded-full"
        />
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 truncate">
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold truncate">
            <Link href={repo.owner.html_url} className="hover:text-blue-600 truncate">
              {repo.owner.login}
            </Link>
            <span className="mx-1">/</span>
            <Link href={repo.html_url} className="hover:text-blue-600 truncate">
              {repo.name}
            </Link>
          </h1>

          {/* Public Badge */}
          <span className="text-xs font-medium text-muted-foreground border border-border rounded-full px-2 py-0.5 whitespace-nowrap w-fit">
            Public
          </span>
        </div>
      </div>

      {/* Right Side: Action Buttons */}
      <div className="flex flex-wrap md:flex-nowrap gap-2 sm:gap-3 md:gap-2 justify-start md:justify-end w-full md:w-auto">
        
        {/* Sponsor Button */}
        <button className="flex items-center gap-1 bg-[#21262D] text-white px-3 py-1.5 rounded-lg border border-gray-700 hover:border-gray-500 transition-colors text-sm sm:text-base">
          <Heart className="w-4 h-4 text-pink-400" />
          Sponsor
        </button>

        {/* Fork Button Group */}
        <div className="flex rounded-lg overflow-hidden border text-white border-gray-700 text-sm sm:text-base">
          <button className="flex items-center gap-1 bg-[#21262D] px-3 py-1.5 hover:bg-[#30363D] transition-colors">
            <GitFork className="w-4 h-4" />
            Fork
          </button>
          <button className="bg-[#21262D] px-2 py-1.5 border-l border-gray-700 hover:bg-[#30363D] transition-colors">
            {formatCount(repo.forks_count)}
          </button>
        </div>

        {/* Star Button Group */}
        <div className="flex rounded-lg overflow-hidden border border-gray-700 text-sm sm:text-base">
          <button className="flex items-center gap-1 bg-[#21262D] text-white px-3 py-1.5 hover:bg-[#30363D] transition-colors">
            <Star className="w-4 h-4 text-yellow-400" />
            Star
          </button>
          <button className="bg-[#21262D] text-white px-2 py-1.5 border-l border-gray-700 hover:bg-[#30363D] transition-colors">
            {formatCount(repo.stargazers_count)}
          </button>
        </div>

      </div>
    </div>
  );
}
