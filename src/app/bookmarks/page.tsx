'use client';

import { useBookmarks } from '@/hooks/useBookmarks';
import { RepoCard } from '@/components/repo-card';
import { Header } from '@/components/header';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function BookmarksPage() {
  const { bookmarks } = useBookmarks();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
            Your Bookmarked Repositories
          </h2>

          {bookmarks.length === 0 ? (
            <div className="py-16 text-center">
              <div className="mb-4 text-lg text-gray-500 dark:text-gray-400">
                No bookmarks yet. Start exploring and save your favorites!
              </div>
              <Link
                href="/"
                className="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-medium text-white transition-all duration-200 hover:from-blue-700 hover:to-purple-700"
              >
                Discover Awesome Repos
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6" key={bookmarks.length}>
              {bookmarks.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
