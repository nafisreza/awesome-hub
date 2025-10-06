"use client";

import type React from "react";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchResults } from "@/components/search-results";
import type { GitHubRepo as Repository } from "@/lib/github";

const categories = [
  { value: "all", label: "All Categories" },
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "react", label: "React" },
  { value: "machine-learning", label: "Machine Learning" },
  { value: "security", label: "Security" },
  { value: "devops", label: "DevOps" },
  { value: "css", label: "CSS" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
];

function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all");
  const [searchResults, setSearchResults] = useState<Repository[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const PER_PAGE = 10;

  const searchRepositories = async (
    query: string,
    category: string,
    page = 1,
    append = false,
    allowEmpty = false
  ) => {
    try {
      if (page === 1) {
        setIsSearching(true);
        setError(null);
      } else {
        setIsLoadingMore(true);
      }

      if (!allowEmpty && !query.trim() && category === "all") {
        setError("Please enter a search term or select a category");
        return;
      }

      const params = new URLSearchParams();
      if (query.trim()) params.set("q", query.trim());
      if (category && category !== "all") params.set("category", category);
      params.set("page", String(page));
      params.set("per_page", String(PER_PAGE));

      const res = await fetch(`/api/search?${params.toString()}`, { method: "GET" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const msg =
          data?.error ||
          (res.status === 429
            ? "GitHub rate limit hit. Please wait a bit before loading more."
            : "Failed to search repositories");
        throw new Error(msg);
      }

      const data = await res.json();
      const repos: Repository[] = data.items ?? [];

      if (append && page > 1) {
        setSearchResults((prev) => {
          const map = new Map<number, Repository>();
          prev.forEach((r) => map.set(r.id, r));
          repos.forEach((r) => {
            if (!map.has(r.id)) map.set(r.id, r);
          });
          return Array.from(map.values());
        });
      } else {
        setSearchResults(repos);
      }

      setCurrentPage(page);
      setHasMore(Boolean(data.hasMore));
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to search repositories";
      setError(errorMessage);
      console.error("[v0] Search error:", err);
    } finally {
      setIsSearching(false);
      setIsLoadingMore(false);
    }
  };

  const handleSearch = () => {
    if (!searchQuery.trim() && selectedCategory === "all") {
      setError("Please enter a search term or select a category");
      return;
    }

    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set("q", searchQuery.trim());
    if (selectedCategory !== "all") params.set("category", selectedCategory);

    router.replace(`/search?${params.toString()}`);
    setCurrentPage(1);
    searchRepositories(searchQuery, selectedCategory, 1, false);
  };

  const handleLoadMore = () => {
    if (hasMore && !isLoadingMore) {
      const nextPage = currentPage + 1;
      searchRepositories(searchQuery, selectedCategory, nextPage, true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  useEffect(() => {
    const query = searchParams.get("q");
    const category = searchParams.get("category") || "all";

    setSearchQuery(query || "");
    setSelectedCategory(category);

    if (query || category !== "all") {
      searchRepositories(query || "", category);
    } else {
      searchRepositories("", "all", 1, false, true);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => router.push("/")} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-2xl font-bold">Search Results</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Search</h2>

                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
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
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-full bg-background/50 border-border/50">
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

                  <Button onClick={handleSearch} disabled={isSearching} className="w-full">
                    {isSearching ? "Searching..." : "Search"}
                  </Button>

                  {error && (
                    <div className="p-3 bg-destructive/10 border border-destructive/20 rounded text-destructive text-sm">
                      {error}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <SearchResults
              results={searchResults}
              isLoading={isSearching}
              hasMore={hasMore}
              isLoadingMore={isLoadingMore}
              onLoadMore={handleLoadMore}
              searchQuery={searchQuery}
              category={selectedCategory}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchPageFallback() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="w-20 h-4 bg-muted animate-pulse rounded mb-4" />
          <div className="w-40 h-8 bg-muted animate-pulse rounded" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="w-full h-80 bg-muted animate-pulse rounded" />
          </div>
          <div className="lg:col-span-3">
            <div className="text-center py-12">
              <div className="w-12 h-12 bg-muted animate-pulse rounded mx-auto mb-4" />
              <div className="w-32 h-6 bg-muted animate-pulse rounded mx-auto mb-2" />
              <div className="w-64 h-4 bg-muted animate-pulse rounded mx-auto" />
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
