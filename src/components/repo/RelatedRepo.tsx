"use client";

import Link from "next/link";
import { GitHubRepo } from "@/lib/github";
import { useState, useMemo } from "react";
import { Star, GitFork } from "lucide-react"; 
import { getLanguageColor } from "@/lib/utils";

const REPOS_PER_PAGE = 5;

export default function RelatedRepos({ repos }: { repos: GitHubRepo[] }) {
  const [currentPage, setCurrentPage] = useState(1);

  const reposToShow = useMemo(() => {
    const endIndex = currentPage * REPOS_PER_PAGE;
    return repos.slice(0, endIndex);
  }, [repos, currentPage]);

  const hasMore = reposToShow.length < repos.length;

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  return (
    <div className="bg-card rounded-xl p-6 space-y-4 border">
      <h2 className="text-lg font-semibold text-foreground">Related Repositories</h2>
      
      <div className="space-y-3">
        {reposToShow.map((r) => (
          <Link
            key={r.id}
            href={`/repo/${r.owner.login}/${r.name}`}
            className="block p-4 rounded-lg hover:bg-muted/50 transition-colors duration-200 border border-transparent hover:border-border group"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
              {/* Repository Name */}
              <h3 className="font-semibold text-blue-500 group-hover:text-blue-600 text-sm sm:text-base md:text-lg truncate pr-2">
                {r.owner.login}/<span className="font-bold">{r.name}</span>
              </h3>

              {/* Stars Count */}
              {r.stargazers_count > 0 && (
                <span className="flex items-center text-gray-400 text-xs sm:text-sm gap-1 mt-1 sm:mt-0 flex-shrink-0">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                  {r.stargazers_count.toLocaleString()}
                </span>
              )}
            </div>

            {/* Description */}
            {r.description && (
              <p className="text-gray-400 text-xs sm:text-sm md:text-base mt-0.5 line-clamp-2 leading-tight">
                {r.description}
              </p>
            )}

            {/* Language and Forks */}
            <div className="flex flex-wrap items-center gap-4 mt-2 text-gray-500 text-xs sm:text-sm">
              {r.language && (
                <span className="flex items-center gap-1">
                  <span
                    className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full"
                    style={{ backgroundColor: getLanguageColor(r.language) }}
                  ></span>
                  {r.language}
                </span>
              )}
              {r.forks_count > 0 && (
                <span className="flex items-center gap-1">
                  <GitFork className="w-3 h-3 sm:w-4 sm:h-4" />
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
            className="w-full text-center text-sm sm:text-base font-medium text-blue-400 hover:text-blue-300 py-1 transition-colors"
          >
            Load More (Showing {reposToShow.length} of {repos.length})
          </button>
        </div>
      )}
    </div>
  );
}

