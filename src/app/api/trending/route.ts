import { NextResponse } from 'next/server';
import { GitHubService, GitHubRepo } from '@/lib/github';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get('timeRange') || 'week';
    const sortBy = searchParams.get('sortBy') || 'trending-score';

    // Fetch trending repositories based on time range
    let repositories: GitHubRepo[] = [];
    
    switch (timeRange) {
      case 'today':
        repositories = await GitHubService.searchAwesomeRepos({
          dateRange: 'day',
          minStars: 5,
          sort: 'updated',
          order: 'desc'
        });
        break;
      case 'week':
        repositories = await GitHubService.searchAwesomeRepos({
          dateRange: 'week',
          minStars: 10,
          sort: 'stars',
          order: 'desc'
        });
        break;
      case 'month':
        repositories = await GitHubService.searchAwesomeRepos({
          dateRange: 'month',
          minStars: 50,
          sort: 'stars',
          order: 'desc'
        });
        break;
      default:
        repositories = await GitHubService.getTrendingAwesomeRepos();
    }

    // Calculate trending scores and sort
    const reposWithScores = repositories.map((repo) => {
      const daysSinceUpdate = Math.floor(
        (Date.now() - new Date(repo.updated_at).getTime()) / (1000 * 60 * 60 * 24)
      );
      const daysSinceCreation = Math.floor(
        (Date.now() - new Date(repo.created_at).getTime()) / (1000 * 60 * 60 * 24)
      );
      
      // Trending score calculation
      let trendingScore = 0;
      
      // Base score from stars (logarithmic to prevent dominance of super popular repos)
      const starScore = Math.log10(repo.stargazers_count + 1) * 20;
      
      // Recency bonus (higher score for recently updated repos)
      const recencyBonus = Math.max(0, 100 - daysSinceUpdate * 2);
      
      // Growth potential (newer repos get bonus)
      const ageBonus = daysSinceCreation < 365 ? 50 - (daysSinceCreation / 365) * 50 : 0;
      
      // Activity score based on forks (indicates community engagement)
      const forkScore = Math.log10(repo.forks_count + 1) * 10;
      
      trendingScore = starScore + recencyBonus + ageBonus + forkScore;
      
      return {
        ...repo,
        trendingScore: Math.round(trendingScore),
      };
    });

    // Sort repositories based on the selected criteria
    const sortedRepos = [...reposWithScores];
    
    switch (sortBy) {
      case 'stars':
        sortedRepos.sort((a, b) => b.stargazers_count - a.stargazers_count);
        break;
      case 'recent':
        sortedRepos.sort((a, b) => 
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
        break;
      case 'trending-score':
      default:
        sortedRepos.sort((a, b) => b.trendingScore - a.trendingScore);
    }

    // Limit results
    const limitedRepos = sortedRepos.slice(0, 50);

    // Calculate statistics
    const totalStars = limitedRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const averageStars = limitedRepos.length > 0 ? totalStars / limitedRepos.length : 0;

    // Get top languages
    const languageCounts: Record<string, number> = {};
    limitedRepos.forEach((repo) => {
      if (repo.language) {
        languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
      }
    });

    const topLanguages = Object.entries(languageCounts)
      .map(([language, count]) => ({ language, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    const stats = {
      totalRepositories: limitedRepos.length,
      timeRange,
      averageStars,
      topLanguages,
    };

    const response = NextResponse.json({
      repositories: limitedRepos,
      stats,
      lastUpdated: new Date().toISOString(),
    });
    
    // Cache for 10 minutes
    response.headers.set('Cache-Control', 's-maxage=600, stale-while-revalidate=1200');
    
    return response;

  } catch (error) {
    console.error('Error in trending API:', error);
    
    // Check if it's a rate limit error
    const isRateLimited = error && typeof error === 'object' && 'status' in error && error.status === 403;
    const hasToken = !!process.env.GITHUB_TOKEN;
    
    return NextResponse.json(
      { 
        error: isRateLimited ? 'GitHub API rate limit exceeded' : 'Failed to fetch trending repositories',
        repositories: [],
        stats: {
          totalRepositories: 0,
          timeRange: 'week',
          averageStars: 0,
          topLanguages: [],
        },
        lastUpdated: new Date().toISOString(),
        rateLimited: isRateLimited,
        authenticated: hasToken,
        suggestion: !hasToken ? 'Add GITHUB_TOKEN environment variable for higher rate limits' : undefined,
      },
      { status: isRateLimited ? 429 : 500 }
    );
  }
}