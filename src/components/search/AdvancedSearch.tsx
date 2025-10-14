'use client';

import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, GitFork, User, Clock } from 'lucide-react';

interface Repo {
  id: number;
  full_name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
}

export default function AdvancedSearchCard() {
  const router = useRouter();

  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('');
  const [minStars, setMinStars] = useState('');
  const [minForks, setMinForks] = useState('');
  const [dateRange, setDateRange] = useState('any');
  const [sort, setSort] = useState('stars');
  const [order, setOrder] = useState('desc');
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);

  const dateOptions = [
    { value: 'any', label: 'Any time' },
    { value: 'day', label: 'Last day' },
    { value: 'week', label: 'Last week' },
    { value: 'month', label: 'Last month' },
    { value: 'year', label: 'Last year' },
  ];

  const fetchRepos = useCallback(async () => {
    if (!query.trim() || loading) return;
    setLoading(true);

    const params = new URLSearchParams({
      query,
      language,
      sort,
      order,
      page: '1',
    });
    if (minStars) params.append('minStars', minStars);
    if (minForks) params.append('minForks', minForks);
    if (dateRange !== 'any') params.append('dateRange', dateRange);

    try {
      const res = await fetch(`/api/search?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data: Repo[] = await res.json();
      setRepos(data.slice(0, 5)); // top 5 results
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  }, [query, language, minStars, minForks, sort, order, dateRange, loading]);

  const debouncedSearch = useCallback(debounce(fetchRepos, 400), [fetchRepos]);

  useEffect(() => {
    if (query.trim()) debouncedSearch();
  }, [query, language, minStars, minForks, dateRange, sort, order]);

  const handleSeeMore = () => {
    if (!query.trim()) return;
    const params = new URLSearchParams({
      query,
      language,
      sort,
      order,
      minStars,
      minForks,
      dateRange,
    });
    router.push(`/search?${params.toString()}`);
  };

  return (
    <Card className="p-6 max-w-5xl mx-auto">
      <CardContent>
        <h1 className="text-2xl font-semibold mb-4">🔍 Quick Repository Search</h1>

        {/* Search input */}
        <Input
          type="text"
          placeholder="Search repositories..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="mb-4"
        />

        {/* Filters */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Input
            placeholder="Language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          />
          <Input
            placeholder="Min Stars"
            value={minStars}
            onChange={(e) => setMinStars(e.target.value)}
          />
          <Input
            placeholder="Min Forks"
            value={minForks}
            onChange={(e) => setMinForks(e.target.value)}
          />
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {dateOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="stars">Most stars</SelectItem>
              <SelectItem value="forks">Most forks</SelectItem>
              <SelectItem value="updated">Recently updated</SelectItem>
            </SelectContent>
          </Select>
          <Select value={order} onValueChange={setOrder}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Descending</SelectItem>
              <SelectItem value="asc">Ascending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results */}
        {repos.map((repo) => (
          <Card key={repo.id} className="mb-3 hover:bg-gray-50 transition">
            <CardContent>
              <a href={repo.html_url} target="_blank" rel="noreferrer" className="block">
                <h2 className="text-lg font-medium">{repo.full_name}</h2>
                <p className="text-sm text-gray-600 mb-1">{repo.description}</p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Star className="w-4 h-4" /> {repo.stargazers_count}</span>
                  <span className="flex items-center gap-1"><GitFork className="w-4 h-4" /> {repo.forks_count}</span>
                  <span className="flex items-center gap-1"><User className="w-4 h-4" /> {repo.language || '-'}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {new Date(repo.updated_at).toLocaleDateString()}</span>
                </div>
              </a>
            </CardContent>
          </Card>
        ))}

        {loading && <p className="text-center text-gray-500 mt-4">Loading...</p>}
        {!loading && repos.length === 0 && query.trim() && (
          <p className="text-center text-gray-500">No results found.</p>
        )}

        {/* See More Button */}
        {repos.length > 0 && (
          <div className="text-center mt-6">
            <Button onClick={handleSeeMore}>See More Results →</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
