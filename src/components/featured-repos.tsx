'use client';

import { useState, useEffect } from 'react';
import { Star, GitFork, ExternalLink, Calendar, Clipboard, ClipboardCheck } from 'lucide-react';
import { GitHubRepo as Repository } from '@/lib/github';
import { formatNumber, formatDate } from '@/lib/utils';
import { useBookmarks } from '@/hooks/useBookmarks';
import { FeaturedReposSkeleton } from '@/components/skeletons/FeaturedReposSkeleton';
import { toast } from 'sonner';
import Link from 'next/link';

export function FeaturedRepos() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();
  const isBookmarked = (id: number) => bookmarks.some((b) => b.id === id);
  const [copiedRepoId, setCopiedRepoId] = useState<number | null>(null);

  useEffect(() => {
    const fetchFeaturedRepos = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/featured');
        if (!response.ok) {
          throw new Error('Failed to fetch featured repositories');
        }
        const data = await response.json();
        setRepos(data);
      } catch (error) {
        console.error('Error fetching featured repos:', error);
        setRepos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedRepos();
  }, []);

  const handleCopyURL = (repo: Repository) => {
    navigator.clipboard.writeText(repo.html_url);
    setCopiedRepoId(repo.id);
    toast.success('Repository URL copied to clipboard');
    setTimeout(() => {
      setCopiedRepoId((current) => (current === repo.id ? null : current));
    }, 800);
  };

  if (loading) {
    return <FeaturedReposSkeleton />;
  }

  return (
    <section className="mb-16">
      <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">Featured Repositories</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {repos.map((repo) => (
          <div
            key={repo.id}
            className="rounded-xl bg-white p-6 shadow-lg transition-shadow duration-200 hover:shadow-xl dark:bg-slate-800"
          >
            <div className="mb-4 flex items-start justify-between gap-2">
              <div className="flex-1">
                <Link href={`/repo/${repo.owner.login}/${repo.name}`}>
                  <h3 className="mb-1 cursor-pointer text-lg font-semibold text-gray-900 transition-colors hover:text-blue-600 dark:text-white dark:hover:text-blue-400">
                    {repo.name}
                  </h3>
                </Link>
                <p className="text-sm text-gray-600 dark:text-gray-400">{repo.full_name}</p>
              </div>
              <button
                aria-label="Copy repository URL"
                onClick={() => handleCopyURL(repo)}
                className="cursor-pointer text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300"
              >
                {copiedRepoId === repo.id ? (
                  <ClipboardCheck
                    aria-label="Copied"
                    className="size-5 scale-110 text-green-500 transition-transform duration-200"
                  />
                ) : (
                  <Clipboard aria-label="Copy repository URL" className="size-5" />
                )}
              </button>
              <button
                aria-label={isBookmarked(repo.id) ? 'Remove bookmark' : 'Add bookmark'}
                onClick={() => (isBookmarked(repo.id) ? removeBookmark(repo.id) : addBookmark(repo))}
              >
                <Star
                  size={20}
                  className={`transition-colors ${
                    isBookmarked(repo.id) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'
                  }`}
                />
              </button>

              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-0.5 text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300"
              >
                <ExternalLink className="size-4.5" />
              </a>
            </div>

            <p className="mb-4 line-clamp-2 text-sm text-gray-700 dark:text-gray-300">
              {repo.description || 'No description available'}
            </p>

            <div className="mb-4 flex flex-wrap gap-1">
              {repo.topics.slice(0, 3).map((topic) => (
                <span
                  key={topic}
                  className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                >
                  {topic}
                </span>
              ))}
              {repo.topics.length > 3 && (
                <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                  +{repo.topics.length - 3}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
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
                  })}
                </span>
              </div>
            </div>

            {repo.language && (
              <div className="mt-3 border-t border-gray-200 pt-3 dark:border-gray-700">
                <span className="inline-flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                  <div className="h-3 w-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"></div>
                  {repo.language || 'Unknown'}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button className="rounded-lg border border-gray-200 bg-white px-6 py-3 font-medium transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-slate-800 dark:hover:bg-slate-700">
          View All Repositories
        </button>
      </div>
    </section>
  );
}
