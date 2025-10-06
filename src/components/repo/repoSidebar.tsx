import Link from 'next/link';
import { GitHubRepo } from '@/lib/github';
import { BookOpen, Star, GitFork } from 'lucide-react';

interface Props {
  repo: GitHubRepo;
}

export default function RepoSidebarAbout({ repo }: Props) {
  return (
    <div className="bg-card space-y-4 rounded-xl border p-6">
      <h2 className="text-foreground mb-3 text-lg font-semibold">About</h2>

      {/* Description */}
      {repo.description && <p className="text-foreground text-sm leading-relaxed">{repo.description}</p>}

      {/* Topics */}
      <div className="mt-3 flex flex-wrap gap-2">
        {repo.topics?.map((topic) => (
          <span
            key={topic}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-full px-3 py-1 text-xs font-medium transition-colors"
          >
            {topic}
          </span>
        ))}
      </div>

      <hr className="border-border my-4" />

      {/* Info Links and Stats */}
      <div className="space-y-3 text-sm">
        {/* Readme Link */}
        <div className="text-foreground hover:text-primary flex items-center gap-2 transition-colors">
          <BookOpen className="text-muted-foreground h-4 w-4" />
          <Link
            href={`https://github.com/${repo.owner.login}/${repo.name}?tab=readme-ov-file#readme`}
            className="truncate hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Readme
          </Link>
        </div>

        <hr className="border-border my-4" />

        {/* Stars */}
        <div className="text-foreground flex items-center gap-2">
          <Star className="h-4 w-4 text-yellow-500" />
          <span className="font-medium">{repo.stargazers_count.toLocaleString()} stars</span>
        </div>

        {/* Forks */}
        <div className="text-foreground flex items-center gap-2">
          <GitFork className="h-4 w-4 text-blue-500" />
          <span className="font-medium">{repo.forks_count.toLocaleString()} forks</span>
        </div>
      </div>
    </div>
  );
}
