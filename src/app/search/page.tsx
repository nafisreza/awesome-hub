'use client';

import { useState, useEffect, Suspense, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import debounce from 'lodash.debounce';
import { Search, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SearchResults } from '@/components/search-results';
import { GitHubService, type GitHubRepo as Repository, type SearchFilters } from '@/lib/github';

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'react', label: 'React' },
  { value: 'machine-learning', label: 'Machine Learning' },
  { value: 'security', label: 'Security' },
  { value: 'devops', label: 'DevOps' },
  { value: 'css', label: 'CSS' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
];

function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [language, setLanguage] = useState(searchParams.get('language') || '');
  const [minStars, setMinStars] = useState(searchParams.get('minStars') || '');
  const [minForks, setMinForks] = useState(searchParams.get('minForks') || '');
const [dateRange, setDateRange] = useState<"day" | "week" | "month" | "year" | "">("");
  const [sort, setSort] = useState(searchParams.get('sort') || 'stars');
  const [order, setOrder] = useState(searchParams.get('order') || 'desc');

  const [searchResults, setSearchResults] = useState<Repository[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Main search function
  const searchRepositories = useCallback(
    async (page: number = 1, append: boolean = false) => {
      try {
        if (page === 1) {
          setIsSearching(true);
          setError(null);
        } else {
          setIsLoadingMore(true);
        }

        if (!searchQuery.trim() && selectedCategory === 'all') {
          setError('Please enter a search term or select a category');
          return;
        }

        const filters: SearchFilters = {
          query: searchQuery.trim() || 'awesome',
          language: language || undefined,
          minStars: minStars ? Number(minStars) : undefined,
          minForks: minForks ? Number(minForks) : undefined,
          dateRange: dateRange || undefined,
          sort: sort as 'stars' | 'forks' | 'updated',
          order: order as 'asc' | 'desc',
        };

        // Map category to topic
        if (selectedCategory && selectedCategory !== 'all') {
          const categoryTopicMap: Record<string, string> = {
            javascript: 'javascript',
            python: 'python',
            react: 'react',
            'machine-learning': 'machine-learning',
            security: 'security',
            devops: 'devops',
            css: 'css',
            go: 'go',
            rust: 'rust',
          };
          if (categoryTopicMap[selectedCategory]) {
            filters.topic = categoryTopicMap[selectedCategory];
          }
        }

        const repos: Repository[] = await GitHubService.searchAwesomeRepos(filters, page);

        if (append && page > 1) {
          setSearchResults((prev) => [...prev, ...repos]);
        } else {
          setSearchResults(repos);
        }

        setCurrentPage(page);
        setHasMore(repos.length === 50);
        setHasSearched(true);
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to search repositories';
        setError(errorMessage);
        console.error('Search error:', err);
      } finally {
        setIsSearching(false);
        setIsLoadingMore(false);
      }
    },
    [
      searchQuery,
      selectedCategory,
      language,
      minStars,
      minForks,
      dateRange,
      sort,
      order,
    ]
  );

  const debouncedSearch = useCallback(debounce(() => searchRepositories(1, false), 400), [searchRepositories]);

  // Run search when filters change
  useEffect(() => {
    debouncedSearch();
  }, [searchQuery, selectedCategory, language, minStars, minForks, dateRange, sort, order]);

  const handleSearchClick = () => {
    setCurrentPage(1);
    searchRepositories(1, false);

    // Update URL params for sharing/bookmarking
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set('q', searchQuery.trim());
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (language) params.set('language', language);
    if (minStars) params.set('minStars', minStars);
    if (minForks) params.set('minForks', minForks);
    if (dateRange) params.set('dateRange', dateRange);
    params.set('sort', sort);
    params.set('order', order);

    router.replace(`/search?${params.toString()}`);
  };

  const handleLoadMore = () => {
    if (hasMore && !isLoadingMore) {
      searchRepositories(currentPage + 1, true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearchClick();
    }
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => router.push('/')} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <h1 className="text-2xl font-bold">Search Repositories</h1>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Advanced Search Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h2 className="mb-4 text-lg font-semibold">Advanced Search</h2>

                <div className="space-y-4">
                  <div className="relative">
                    <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                    <Input
                      type="text"
                      placeholder="Search repositories..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="pl-10"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">Category</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="bg-background/50 border-border/50 w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Input
                    placeholder="Language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="p-2 border rounded"
                  />
                  <Input
                    placeholder="Min Stars"
                    value={minStars}
                    onChange={(e) => setMinStars(e.target.value)}
                    className="p-2 border rounded"
                  />
                  <Input
                    placeholder="Min Forks"
                    value={minForks}
                    onChange={(e) => setMinForks(e.target.value)}
                    className="p-2 border rounded"
                  />
                  <Select value={dateRange} onValueChange={(value: "day" | "week" | "month" | "year" | "") => setDateRange(value)}>
                    <SelectTrigger className="bg-background/50 border-border/50 w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={dateRange}>Any time</SelectItem>
                      <SelectItem value="day">Last day</SelectItem>
                      <SelectItem value="week">Last week</SelectItem>
                      <SelectItem value="month">Last month</SelectItem>
                      <SelectItem value="year">Last year</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={sort} onValueChange={setSort}>
                    <SelectTrigger className="bg-background/50 border-border/50 w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stars">Most stars</SelectItem>
                      <SelectItem value="forks">Most forks</SelectItem>
                      <SelectItem value="updated">Recently updated</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={order} onValueChange={setOrder}>
                    <SelectTrigger className="bg-background/50 border-border/50 w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="desc">Descending</SelectItem>
                      <SelectItem value="asc">Ascending</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button onClick={handleSearchClick} disabled={isSearching} className="w-full">
                    {isSearching ? 'Searching...' : 'Search'}
                  </Button>

                  {error && (
                    <div className="bg-destructive/10 border-destructive/20 text-destructive rounded border p-3 text-sm">
                      {error}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {hasSearched ? (
              <>
                <SearchResults
                  results={searchResults.slice(0, 5)}
                  isLoading={isSearching}
                  hasMore={hasMore}
                  isLoadingMore={isLoadingMore}
                  onLoadMore={handleLoadMore}
                  searchQuery={searchQuery}
                  category={selectedCategory}
                />
                {searchResults.length > 5 && (
                  <div className="text-center mt-6">
                    <Button
                      onClick={handleLoadMore}
                      disabled={isLoadingMore}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      {isLoadingMore ? 'Loading...' : 'Load More Results'}
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="py-12 text-center">
                <Search className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                <h3 className="mb-2 text-lg font-medium">Start Your Search</h3>
                <p className="text-muted-foreground">
                  Enter a search term and click search to find awesome repositories
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchPageFallback() {
  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <div className="bg-muted mb-4 h-4 w-20 animate-pulse rounded" />
          <div className="bg-muted h-8 w-40 animate-pulse rounded" />
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="bg-muted h-80 w-full animate-pulse rounded" />
          </div>
          <div className="lg:col-span-3">
            <div className="py-12 text-center">
              <div className="bg-muted mx-auto mb-4 h-12 w-12 animate-pulse rounded" />
              <div className="bg-muted mx-auto mb-2 h-6 w-32 animate-pulse rounded" />
              <div className="bg-muted mx-auto h-4 w-64 animate-pulse rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchPageFallback />}>
      <SearchPageContent />
    </Suspense>
  );
}
