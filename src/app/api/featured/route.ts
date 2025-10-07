import { NextResponse } from 'next/server';
import { GitHubService } from '@/lib/github';
import { cacheFirst } from '@/lib/cache';

export async function GET() {
  try {
    // Cache featured repos for 30 minutes
    const repos = await cacheFirst(
      'featured-repos',
      async () => {
        // Get top awesome repositories
        const allRepos = await GitHubService.searchAwesomeRepos({
          minStars: 1000, // Only high-quality repos
          sort: 'stars',
          order: 'desc',
        });

        // Return top 6 for featured section
        return allRepos.slice(0, 6);
      },
      30 // 30 minutes cache
    );

    return NextResponse.json(repos);
  } catch (error) {
    console.error('Featured repos error:', error);
    return NextResponse.json({ error: 'Failed to fetch featured repositories' }, { status: 500 });
  }
}
