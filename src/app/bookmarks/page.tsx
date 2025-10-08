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
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-foreground">
            Your Bookmarked Repositories
          </h2>

          {bookmarks.length === 0 ? (
            <div className="py-16 text-center">
              <div className="mb-4 text-lg text-muted-foreground">
                No bookmarks yet. Start exploring and save your favorites!
              </div>
              <Link
                href="/"
                className="inline-flex items-center rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90"
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
