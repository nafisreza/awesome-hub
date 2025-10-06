'use client';

import { Star, GitFork, ExternalLink, Calendar, Loader2, Package } from 'lucide-react';
import { formatNumber, formatDate } from '@/lib/utils';
import { GitHubRepo as Repository } from '@/lib/github';

interface SearchResultsProps {
  results: Repository[];
  isLoading: boolean;
  hasMore: boolean;
  isLoadingMore: boolean;
  onLoadMore: () => void;
  searchQuery: string;
  category: string;
}

export function SearchResults({
  results,
  isLoading,
  hasMore,
  isLoadingMore,
  onLoadMore,
  searchQuery,
  category,
}: SearchResultsProps) {
  const getLanguageColor = (language: string | null) => {
    const colors: { [key: string]: string } = {
      JavaScript: 'bg-yellow-500',
      TypeScript: 'bg-blue-600',
      Python: 'bg-green-600',
      Java: 'bg-red-600',
      'C++': 'bg-blue-700',
      C: 'bg-gray-600',
      'C#': 'bg-purple-600',
      Go: 'bg-cyan-600',
      Rust: 'bg-orange-600',
      PHP: 'bg-indigo-600',
      Ruby: 'bg-red-500',
      Swift: 'bg-orange-500',
      Kotlin: 'bg-purple-500',
      HTML: 'bg-orange-500',
      CSS: 'bg-blue-500',
      Shell: 'bg-gray-700',
      Vue: 'bg-green-500',
      React: 'bg-blue-400',
    };
    return colors[language || ''] || 'bg-gray-500';
  };

  if (isLoading) {
    return (
      <section className="mb-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Searching repositories...</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Finding awesome repositories for &ldquo;{searchQuery || 'awesome'}
              &rdquo;
            </p>
          </div>

          {/* Loading skeleton */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse rounded-xl bg-white p-6 shadow-lg dark:bg-slate-800">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-2 h-5 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>
                    <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                  <div className="h-4 w-4 rounded bg-gray-200 dark:bg-gray-700"></div>
                </div>
                <div className="mb-4 space-y-2">
                  <div className="h-3 rounded bg-gray-200 dark:bg-gray-700"></div>
                  <div className="h-3 w-4/5 rounded bg-gray-200 dark:bg-gray-700"></div>
                </div>
                <div className="mb-4 flex gap-2">
                  <div className="h-6 w-16 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  <div className="h-6 w-20 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  <div className="h-6 w-12 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                    <div className="h-4 w-12 rounded bg-gray-200 dark:bg-gray-700"></div>
                    <div className="h-4 w-12 rounded bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                  <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-700"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Search Results</h2>
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span>Found {results.length} repositories</span>
            {searchQuery && (
              <>
                <span>•</span>
                <span>for &ldquo;{searchQuery}&rdquo;</span>
              </>
            )}
            {category !== 'all' && (
              <>
                <span>•</span>
                <span>in {category}</span>
              </>
            )}
          </div>
        </div>

        {results.length === 0 ? (
          <div className="py-12 text-center">
            <Package className="mx-auto mb-4 h-16 w-16 text-gray-400" />
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">No repositories found</h3>
            <p className="mx-auto max-w-md text-gray-600 dark:text-gray-400">
              Try adjusting your search terms or category filter to find more repositories.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {results.map((repo) => (
                <div
                  key={repo.id}
                  className="group rounded-xl bg-white p-6 shadow-lg transition-all duration-200 hover:shadow-xl dark:bg-slate-800"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <h3 className="mb-1 truncate text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                        {repo.name}
                      </h3>
                      <p className="truncate text-sm text-gray-600 dark:text-gray-400">{repo.full_name}</p>
                    </div>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 p-2 text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300"
                      title="Open on GitHub"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>

                  <p className="mb-4 line-clamp-2 min-h-[2.5rem] text-sm text-gray-700 dark:text-gray-300">
                    {repo.description || 'No description available'}
                  </p>

                  <div className="mb-4 flex min-h-[2rem] flex-wrap gap-1">
                    {(repo.topics || []).slice(0, 5).map((topic) => (
                      <span
                        key={topic}
                        className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      >
                        {topic}
                      </span>
                    ))}
                    {(repo.topics?.length || 0) > 5 && (
                      <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                        +{(repo.topics?.length || 0) - 5}
                      </span>
                    )}
                  </div>

                  <div className="mb-3 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        <span>{formatNumber(repo.stargazers_count)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="h-4 w-4" />
                        <span>{formatNumber(repo.forks_count)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {formatDate(repo.updated_at, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>

                  {repo.language && (
                    <div className="border-t border-gray-200 pt-3 dark:border-gray-700">
                      <div className="flex items-center gap-2">
                        <div className={`h-3 w-3 rounded-full ${getLanguageColor(repo.language)}`}></div>
                        <span className="text-xs text-gray-600 dark:text-gray-400">{repo.language}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {hasMore && (
              <div className="text-center">
                <button
                  onClick={onLoadMore}
                  disabled={isLoadingMore}
                  className="mx-auto flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-8 py-3 font-medium transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-slate-800 dark:hover:bg-slate-700"
                >
                  {isLoadingMore ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Loading more...
                    </>
                  ) : (
                    'Load More Repositories'
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
