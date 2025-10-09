'use client';

import { useState, useEffect, useCallback } from 'react';
import { TrendingUp, Filter, Calendar, Star, Clock, Flame, Zap } from 'lucide-react';
import { GitHubRepo } from '@/lib/github';
import { RepoCard } from '@/components/repo-card';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

type TimeRange = 'today' | 'week' | 'month';
type SortBy = 'stars' | 'trending-score' | 'recent';

interface TrendingStats {
  totalRepositories: number;
  timeRange: string;
  averageStars: number;
  topLanguages: Array<{ language: string; count: number }>;
}

const TrendingRepoSkeleton = () => (
  <Card className="relative overflow-hidden">
    <CardContent className="p-6">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-full" />
          </div>
          <Skeleton className="h-8 w-16 ml-4" />
        </div>
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-6 w-16 rounded-full" />
          ))}
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </CardContent>
  </Card>
);

export function TrendingPage() {
  const [repositories, setRepositories] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<TimeRange>('week');
  const [sortBy, setSortBy] = useState<SortBy>('trending-score');
  const [stats, setStats] = useState<TrendingStats | null>(null);

  const fetchTrendingRepos = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/trending?timeRange=${timeRange}&sortBy=${sortBy}`);
      if (response.ok) {
        const data = await response.json();
        setRepositories(data.repositories || []);
        setStats(data.stats || null);
      }
    } catch (error) {
      console.error('Error fetching trending repos:', error);
    } finally {
      setLoading(false);
    }
  }, [timeRange, sortBy]);

  useEffect(() => {
    fetchTrendingRepos();
  }, [fetchTrendingRepos]);

  const getTrendingBadge = (repo: GitHubRepo, index: number) => {
    if (index === 0) {
      return <Badge variant="secondary" className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 text-yellow-600 border-yellow-400/30"><Flame className="w-3 h-3 mr-1" />#1 Trending</Badge>;
    }
    if (index < 3) {
      return <Badge variant="secondary" className="bg-gradient-to-r from-orange-400/20 to-red-500/20 text-orange-600 border-orange-400/30"><TrendingUp className="w-3 h-3 mr-1" />Hot</Badge>;
    }
    if (index < 10) {
      return <Badge variant="outline" className="text-green-600 border-green-400/30"><Zap className="w-3 h-3 mr-1" />Rising</Badge>;
    }
    return null;
  };

  const getTimeRangeLabel = (range: TimeRange) => {
    switch (range) {
      case 'today':
        return 'Today';
      case 'week':
        return 'This Week';
      case 'month':
        return 'This Month';
      default:
        return 'This Week';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      
      <div className="container mx-auto px-4 py-12 lg:px-6">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <TrendingUp className="h-8 w-8" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Trending Repositories
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover the hottest GitHub repositories in the awesome lists ecosystem. 
            See what&apos;s gaining popularity and climbing the charts.
          </p>
        </div>

        {/* Stats & Filters */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Stats Cards */}
          {stats && (
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="glass-strong">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10">
                      <Star className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stats.totalRepositories}</p>
                      <p className="text-sm text-muted-foreground">Trending Repos</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-strong">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-yellow-500/10">
                      <TrendingUp className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{Math.round(stats.averageStars).toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Avg. Stars</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-strong">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-500/10">
                      <Clock className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{getTimeRangeLabel(timeRange)}</p>
                      <p className="text-sm text-muted-foreground">Time Range</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 p-6 rounded-xl glass-strong">
          <div className="flex items-center gap-3">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">Filter by:</span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <Select value={timeRange} onValueChange={(value: TimeRange) => setTimeRange(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <Select value={sortBy} onValueChange={(value: SortBy) => setSortBy(value)}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trending-score">Trending Score</SelectItem>
                  <SelectItem value="stars">Most Stars</SelectItem>
                  <SelectItem value="recent">Recently Updated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            onClick={fetchTrendingRepos}
            className="hover:bg-primary/5"
          >
            Refresh
          </Button>
        </div>

        {/* Top Languages */}
        {stats?.topLanguages && stats.topLanguages.length > 0 && (
          <div className="mb-8 p-6 rounded-xl glass-strong">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="text-2xl">🔥</span>
              Trending Languages
            </h3>
            <div className="flex flex-wrap gap-2">
              {stats.topLanguages.slice(0, 8).map((lang) => (
                <Badge
                  key={lang.language}
                  variant="secondary"
                  className="bg-gradient-to-r from-primary/10 to-primary/5 text-primary border-primary/20"
                >
                  {lang.language} ({lang.count})
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Repository List */}
        <div className="space-y-6">
          {loading ? (
            // Loading skeletons
            [...Array(8)].map((_, index) => <TrendingRepoSkeleton key={index} />)
          ) : repositories.length > 0 ? (
            repositories.map((repo, index) => (
              <div key={repo.id} className="relative group">
                {/* Ranking badge */}
                <div className="absolute -left-12 top-6 z-10 hidden lg:flex flex-col items-center">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                    ${index < 3 
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' 
                      : 'bg-muted text-muted-foreground'
                    }
                  `}>
                    {index + 1}
                  </div>
                </div>
                
                {/* Trending badge */}
                <div className="absolute -top-2 -right-2 z-10">
                  {getTrendingBadge(repo, index)}
                </div>
                
                <RepoCard repo={repo} />
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📈</div>
              <h3 className="text-xl font-semibold mb-2">No trending repositories found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or check back later for new trending projects.
              </p>
              <Button variant="outline" onClick={fetchTrendingRepos}>
                Refresh
              </Button>
            </div>
          )}
        </div>

        {/* Load more */}
        {repositories.length > 0 && !loading && (
          <div className="text-center mt-12">
            <p className="text-muted-foreground text-sm mb-4">
              Showing {repositories.length} trending repositories for {getTimeRangeLabel(timeRange).toLowerCase()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}