'use client';

import { Star, GitFork, ExternalLink, Calendar, TrendingUp, Bookmark, BookmarkCheck } from 'lucide-react';
import { GitHubRepo as Repository } from '@/lib/github';
import { formatNumber, formatDate } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useState } from 'react';

interface RepoCardProps {
  repo: Repository;
}

export function RepoCard({ repo }: RepoCardProps) {
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();
  const [isHovered, setIsHovered] = useState(false);

  // Check if the current repo is already bookmarked
  const isBookmarked = bookmarks.some((b) => b.id === repo.id);

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      JavaScript: 'from-yellow-400 to-yellow-600',
      TypeScript: 'from-blue-400 to-blue-600',
      Python: 'from-green-400 to-green-600',
      React: 'from-cyan-400 to-cyan-600',
      Vue: 'from-emerald-400 to-emerald-600',
      Angular: 'from-red-400 to-red-600',
      Go: 'from-cyan-500 to-blue-500',
      Rust: 'from-orange-400 to-red-500',
      Java: 'from-orange-500 to-red-600',
      'C++': 'from-blue-500 to-purple-600',
      PHP: 'from-purple-400 to-indigo-500',
      Ruby: 'from-red-500 to-pink-500',
      Swift: 'from-orange-500 to-red-500',
      Kotlin: 'from-purple-500 to-pink-500',
      'C#': 'from-purple-600 to-blue-600',
    };
    return colors[language] || 'from-gray-400 to-gray-600';
  };

  const getTrendingScore = () => {
    // Calculate trending score based on stars and recent activity
    const daysSinceUpdate = Math.floor((Date.now() - new Date(repo.updated_at).getTime()) / (1000 * 60 * 60 * 24));
    const score = Math.max(0, 100 - daysSinceUpdate + Math.log10(repo.stargazers_count + 1) * 10);
    return Math.min(100, Math.floor(score));
  };

  const trendingScore = getTrendingScore();

  return (
    <TooltipProvider>
      <Card
        className={`group hover-lift glass-strong relative overflow-hidden border-0 transition-all duration-500 ${
          isHovered ? 'animate-pulse-glow' : ''
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Gradient border effect */}
        <div className="gradient-border absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Shimmer effect */}
        <div className="shimmer absolute inset-0 opacity-0 group-hover:opacity-100" />

        <CardHeader className="relative pb-3">
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={`https://github.com/${repo.owner.login}.png`} alt={repo.owner.login} />
                  <AvatarFallback className="text-xs">{repo.owner.login[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="text-muted-foreground truncate text-xs">{repo.owner.login}</span>
                {trendingScore > 70 && (
                  <Badge
                    variant="secondary"
                    className="border-orange-200 bg-gradient-to-r from-orange-500/10 to-red-500/10 px-1.5 py-0.5 text-xs text-orange-600"
                  >
                    <TrendingUp className="mr-1 h-3 w-3" />
                    Hot
                  </Badge>
                )}
              </div>

              <CardTitle className="text-gradient mb-1 origin-left text-lg leading-tight font-bold transition-transform group-hover:scale-105">
                {repo.name}
              </CardTitle>

              <CardDescription className="line-clamp-2 text-sm leading-relaxed">
                {repo.description || 'No description available'}
              </CardDescription>
            </div>

            <div className="ml-4 flex flex-col gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => (isBookmarked ? removeBookmark(repo.id) : addBookmark(repo))}
                    className={`p-2 transition-all duration-300 ${
                      isBookmarked
                        ? 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20'
                        : 'text-muted-foreground hover:bg-yellow-500/10 hover:text-yellow-500'
                    }`}
                  >
                    {isBookmarked ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isBookmarked ? 'Remove bookmark' : 'Add bookmark'}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="text-muted-foreground hover:text-primary hover:bg-primary/10 p-2 transition-all duration-300"
                  >
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View on GitHub</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative pt-0">
          {/* Topics */}
          {repo.topics && repo.topics.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-1.5">
              {repo.topics.slice(0, 3).map((topic, index) => (
                <Badge
                  key={topic}
                  variant="secondary"
                  className={`bg-primary/5 text-primary border-primary/20 hover:bg-primary/10 cursor-pointer px-2 py-1 text-xs transition-colors ${
                    isHovered ? 'animate-float' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {topic}
                </Badge>
              ))}
              {repo.topics.length > 3 && (
                <Badge variant="outline" className="px-2 py-1 text-xs">
                  +{repo.topics.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Stats */}
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <div className="rounded-lg bg-yellow-500/10 p-1.5">
                <Star className="h-3.5 w-3.5 text-yellow-500" />
              </div>
              <span className="font-medium">{formatNumber(repo.stargazers_count)}</span>
              <span className="text-muted-foreground text-xs">stars</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <div className="rounded-lg bg-blue-500/10 p-1.5">
                <GitFork className="h-3.5 w-3.5 text-blue-500" />
              </div>
              <span className="font-medium">{formatNumber(repo.forks_count)}</span>
              <span className="text-muted-foreground text-xs">forks</span>
            </div>
          </div>

          {/* Footer */}
          <div className="border-border/50 flex items-center justify-between border-t pt-3">
            <div className="flex items-center gap-2">
              {repo.language && (
                <div className="flex items-center gap-2 text-xs">
                  <div className={`h-3 w-3 rounded-full bg-gradient-to-r ${getLanguageColor(repo.language)}`} />
                  <span className="font-medium">{repo.language}</span>
                </div>
              )}
            </div>

            <div className="text-muted-foreground flex items-center gap-1 text-xs">
              <Calendar className="h-3 w-3" />
              <span>
                {formatDate(repo.updated_at, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
