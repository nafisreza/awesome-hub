'use client';

import Link from 'next/link';
import { GitHubRepo } from '@/lib/github';
import { useState, useMemo } from 'react';
import { Star, GitFork } from 'lucide-react';
import { getLanguageColor } from '@/lib/utils';

const REPOS_PER_PAGE = 5;

export default function RelatedRepos({ repos }: { repos: GitHubRepo[] }) {
  const [currentPage, setCurrentPage] = useState(1);

  const reposToShow = useMemo(() => {
    const endIndex = currentPage * REPOS_PER_PAGE;
    return repos.slice(0, endIndex);
  }, [repos, currentPage]);

  const hasMore = reposToShow.length < repos.length;

  const handleLoadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="bg-card space-y-4 rounded-xl border p-6">
      <h2 className="text-foreground text-lg font-semibold">Related Repositories</h2>

      <div className="space-y-3">
        {reposToShow.map((r) => (
          <Link
            key={r.id}
            href={`/repo/${r.owner.login}/${r.name}`}
            className="hover:bg-muted/50 hover:border-border group block rounded-lg border border-transparent p-4 transition-colors duration-200"
          >
            <div className="mb-1 flex flex-col justify-between sm:flex-row sm:items-center">
              {/* Repository Name */}
              <h3 className="truncate pr-2 text-sm font-semibold text-blue-500 group-hover:text-blue-600 sm:text-base md:text-lg">
                {r.owner.login}/<span className="font-bold">{r.name}</span>
              </h3>

              {/* Stars Count */}
              {r.stargazers_count > 0 && (
                <span className="mt-1 flex flex-shrink-0 items-center gap-1 text-xs text-gray-400 sm:mt-0 sm:text-sm">
                  <Star className="h-3 w-3 text-yellow-400 sm:h-4 sm:w-4" />
                  {r.stargazers_count.toLocaleString()}
                </span>
              )}
            </div>

            {/* Description */}
            {r.description && (
              <p className="mt-0.5 line-clamp-2 text-xs leading-tight text-gray-400 sm:text-sm md:text-base">
                {r.description}
              </p>
            )}

            {/* Language and Forks */}
            <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-gray-500 sm:text-sm">
              {r.language && (
                <span className="flex items-center gap-1">
                  <span
                    className="h-2.5 w-2.5 rounded-full sm:h-3 sm:w-3"
                    style={{ backgroundColor: getLanguageColor(r.language) }}
                  ></span>
                  {r.language}
                </span>
              )}
              {r.forks_count > 0 && (
                <span className="flex items-center gap-1">
                  <GitFork className="h-3 w-3 sm:h-4 sm:w-4" />
                  {r.forks_count.toLocaleString()}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination/Load More Button */}
      {hasMore && (
        <div className="pt-2">
          <button
            onClick={handleLoadMore}
            className="w-full py-1 text-center text-sm font-medium text-blue-400 transition-colors hover:text-blue-300 sm:text-base"
          >
            Load More (Showing {reposToShow.length} of {repos.length})
          </button>
        </div>
      )}
    </div>
  );
}
