import { NextResponse } from 'next/server';
import { GitHubService } from '@/lib/github';

export async function GET() {
  try {
    // Get repository counts for each category
    const categories = [
      'frontend', 'backend', 'mobile', 'ai-ml', 'devops', 
      'database', 'security', 'web3', 'system-programming', 
      'tools', 'design', 'games'
    ];

    const categoryCounts: Record<string, number> = {};

    // Fetch counts for each category in parallel
    const countPromises = categories.map(async (category) => {
      try {
        const repos = await GitHubService.getReposByCategory(category);
        return { category, count: repos.length };
      } catch (error) {
        console.error(`Error fetching count for category ${category}:`, error);
        return { category, count: 0 };
      }
    });

    const results = await Promise.all(countPromises);
    
    results.forEach(({ category, count }) => {
      categoryCounts[category] = count;
    });

    const response = NextResponse.json({
      categoryCounts,
      totalCategories: categories.length,
      lastUpdated: new Date().toISOString(),
    });
    
    // Cache for 5 minutes
    response.headers.set('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    
    return response;
  } catch (error) {
    console.error('Error in categories API:', error);
    
    // Check if it's a rate limit error
    const isRateLimited = error && typeof error === 'object' && 'status' in error && error.status === 403;
    const hasToken = !!process.env.GITHUB_TOKEN;
    
    return NextResponse.json(
      { 
        error: isRateLimited ? 'GitHub API rate limit exceeded' : 'Failed to fetch category data',
        categoryCounts: {},
        totalCategories: 0,
        lastUpdated: new Date().toISOString(),
        rateLimited: isRateLimited,
        authenticated: hasToken,
        suggestion: !hasToken ? 'Add GITHUB_TOKEN environment variable for higher rate limits' : undefined,
      },
      { status: isRateLimited ? 429 : 500 }
    );
  }
}