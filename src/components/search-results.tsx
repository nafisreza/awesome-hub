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
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Searching repositories...
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Finding awesome repositories for &ldquo;{searchQuery || 'awesome'}&rdquo;
            </p>
          </div>

          {/* Loading skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg animate-pulse">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-3/4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                  <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
                </div>
                <div className="flex gap-2 mb-4">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-12"></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
                  </div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
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
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Search Results
          </h2>
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
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No repositories found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              Try adjusting your search terms or category filter to find more repositories.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {results.map((repo) => (
                <div
                  key={repo.id}
                  className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {repo.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {repo.full_name}
                        </p>
                    </div>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex-shrink-0"
                      title="Open on GitHub"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
                    {repo.description || 'No description available'}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4 min-h-[2rem]">
                    {(repo.topics || []).slice(0, 5).map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                      >
                        {topic}
                      </span>
                    ))}
                    {(repo.topics?.length || 0) > 5 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                        +{(repo.topics?.length || 0) - 5}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        <span>{formatNumber(repo.stargazers_count)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="w-4 h-4" />
                        <span>{formatNumber(repo.forks_count)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(repo.updated_at, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>

                  {repo.language && (
                    <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`}></div>
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
                  className="px-8 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
                >
                  {isLoadingMore ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
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
