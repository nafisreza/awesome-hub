import { NextResponse } from 'next/server';
import { octokit } from '@/lib/github';

export async function GET() {
  try {
    // Get current rate limit status
    const rateLimit = await octokit.rest.rateLimit.get();

    const { core, search } = rateLimit.data.resources;

    return NextResponse.json({
      authenticated: !!process.env.GITHUB_TOKEN,
      rateLimit: {
        core: {
          limit: core.limit,
          remaining: core.remaining,
          reset: new Date(core.reset * 1000).toISOString(),
        },
        search: {
          limit: search.limit,
          remaining: search.remaining,
          reset: new Date(search.reset * 1000).toISOString(),
        },
      },
    });
  } catch (error) {
    console.error('Rate limit check error:', error);
    return NextResponse.json({
      authenticated: !!process.env.GITHUB_TOKEN,
      error: 'Failed to check rate limits',
    });
  }
}
