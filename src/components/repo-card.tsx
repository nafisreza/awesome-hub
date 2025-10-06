'use client'

import { Star, GitFork, ExternalLink, Calendar, TrendingUp, Bookmark, BookmarkCheck } from 'lucide-react'
import { GitHubRepo as Repository } from '@/lib/github';
import { formatNumber, formatDate } from '@/lib/utils'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useBookmarks } from '@/hooks/useBookmarks'
import { useState } from 'react'

interface RepoCardProps {
  repo: Repository
}

export function RepoCard({ repo }: RepoCardProps) {
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks()
  const [isHovered, setIsHovered] = useState(false)

  // Check if the current repo is already bookmarked
  const isBookmarked = bookmarks.some(b => b.id === repo.id)

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
    }
    return colors[language] || 'from-gray-400 to-gray-600'
  }

  const getTrendingScore = () => {
    // Calculate trending score based on stars and recent activity
    const daysSinceUpdate = Math.floor((Date.now() - new Date(repo.updated_at).getTime()) / (1000 * 60 * 60 * 24))
    const score = Math.max(0, 100 - daysSinceUpdate + Math.log10(repo.stargazers_count + 1) * 10)
    return Math.min(100, Math.floor(score))
  }

  const trendingScore = getTrendingScore()

  return (
    <TooltipProvider>
      <Card 
        className={`group relative overflow-hidden hover-lift glass-strong border-0 transition-all duration-500 ${
          isHovered ? 'animate-pulse-glow' : ''
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Gradient border effect */}
        <div className="absolute inset-0 gradient-border opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100" />

        <CardHeader className="relative pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={`https://github.com/${repo.owner.login}.png`} alt={repo.owner.login} />
                  <AvatarFallback className="text-xs">{repo.owner.login[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground truncate">{repo.owner.login}</span>
                {trendingScore > 70 && (
                  <Badge variant="secondary" className="px-1.5 py-0.5 text-xs bg-gradient-to-r from-orange-500/10 to-red-500/10 text-orange-600 border-orange-200">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Hot
                  </Badge>
                )}
              </div>
              
              <CardTitle className="text-lg font-bold text-gradient leading-tight mb-1 group-hover:scale-105 transition-transform origin-left">
                {repo.name}
              </CardTitle>
              
              <CardDescription className="text-sm line-clamp-2 leading-relaxed">
                {repo.description || 'No description available'}
              </CardDescription>
            </div>

            <div className="flex flex-col gap-2 ml-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => isBookmarked ? removeBookmark(repo.id) : addBookmark(repo)}
                    className={`p-2 transition-all duration-300 ${
                      isBookmarked 
                        ? 'text-yellow-500 bg-yellow-500/10 hover:bg-yellow-500/20' 
                        : 'text-muted-foreground hover:text-yellow-500 hover:bg-yellow-500/10'
                    }`}
                  >
                    {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
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
                    className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                  >
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4" />
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
            <div className="flex flex-wrap gap-1.5 mb-4">
              {repo.topics.slice(0, 3).map((topic, index) => (
                <Badge 
                  key={topic} 
                  variant="secondary" 
                  className={`text-xs px-2 py-1 bg-primary/5 text-primary border-primary/20 hover:bg-primary/10 transition-colors cursor-pointer ${
                    isHovered ? 'animate-float' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {topic}
                </Badge>
              ))}
              {repo.topics.length > 3 && (
                <Badge variant="outline" className="text-xs px-2 py-1">
                  +{repo.topics.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <div className="p-1.5 bg-yellow-500/10 rounded-lg">
                <Star className="w-3.5 h-3.5 text-yellow-500" />
              </div>
              <span className="font-medium">{formatNumber(repo.stargazers_count)}</span>
              <span className="text-muted-foreground text-xs">stars</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <div className="p-1.5 bg-blue-500/10 rounded-lg">
                <GitFork className="w-3.5 h-3.5 text-blue-500" />
              </div>
              <span className="font-medium">{formatNumber(repo.forks_count)}</span>
              <span className="text-muted-foreground text-xs">forks</span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-border/50">
            <div className="flex items-center gap-2">
              {repo.language && (
                <div className="flex items-center gap-2 text-xs">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getLanguageColor(repo.language)}`} />
                  <span className="font-medium">{repo.language}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(repo.updated_at, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}
