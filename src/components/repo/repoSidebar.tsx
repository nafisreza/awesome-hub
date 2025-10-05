import Link from "next/link";
import { GitHubRepo } from "@/lib/github";
import { BookOpen, Star, GitFork } from 'lucide-react';

interface Props {
  repo: GitHubRepo;
}

export default function RepoSidebarAbout({ repo }: Props) {
  return (
    <div className="bg-card rounded-xl p-6 space-y-4 border">
      <h2 className="text-lg font-semibold text-foreground mb-3">About</h2>

      {/* Description */}
      {repo.description && (
        <p className="text-foreground text-sm leading-relaxed">
          {repo.description}
        </p>
      )}

      {/* Topics */}
      <div className="flex flex-wrap gap-2 mt-3">
        {repo.topics?.map((topic) => (
          <span
            key={topic}
            className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-medium hover:bg-secondary/80 transition-colors"
          >
            {topic}
          </span>
        ))}
      </div>

      <hr className="border-border my-4" />

      {/* Info Links and Stats */}
      <div className="space-y-3 text-sm">
        {/* Readme Link */}
        <div className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
          <BookOpen className="w-4 h-4 text-muted-foreground" />
          <Link
            href={`https://github.com/${repo.owner.login}/${repo.name}?tab=readme-ov-file#readme`}
            className="hover:underline truncate"
            target="_blank"
            rel="noopener noreferrer"
          >
            Readme
          </Link>
        </div>

        <hr className="border-border my-4" />

        {/* Stars */}
        <div className="flex items-center gap-2 text-foreground">
          <Star className="w-4 h-4 text-yellow-500" />
          <span className="font-medium">{repo.stargazers_count.toLocaleString()} stars</span>
        </div>

        {/* Forks */}
        <div className="flex items-center gap-2 text-foreground">
          <GitFork className="w-4 h-4 text-blue-500" />
          <span className="font-medium">{repo.forks_count.toLocaleString()} forks</span>
        </div>
      </div>
    </div>
  );
}
