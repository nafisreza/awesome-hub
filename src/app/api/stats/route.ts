import { NextResponse } from 'next/server';
import { GitHubService } from '@/lib/github';
import { cacheFirst } from '@/lib/cache';

export async function GET() {
  try {
    // Cache stats for 1 hour since they don't change frequently
    const stats = await cacheFirst(
      'awesome-hub-stats',
      async () => {
        // Get popular awesome repos to calculate stats
        const repos = await GitHubService.searchAwesomeRepos({
          minStars: 10,
          sort: 'stars',
          order: 'desc',
        });

        // Get popular languages for category count
        const languages = await GitHubService.getPopularLanguages();

        const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
        const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);

        return {
          repositories: repos.length,
          totalStars,
          totalForks,
          categories: languages.length,
          // Estimated contributors based on fork counts
          contributors: Math.floor(totalForks * 0.1), // Rough estimate
        };
      },
      60 // Cache for 1 hour
    );

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json({ error: 'Failed to fetch statistics' }, { status: 500 });
  }
}
