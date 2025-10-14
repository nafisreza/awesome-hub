// // /app/api/search/route.ts
// import { NextResponse } from 'next/server';
// import { GitHubService } from '@/lib/github';

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const q = searchParams.get('q') || '';
//   const language = searchParams.get('language');
//   const starsMin = searchParams.get('stars_min');
//   const starsMax = searchParams.get('stars_max');
//   const forksMin = searchParams.get('forks_min');
//   const forksMax = searchParams.get('forks_max');
//   const updated = searchParams.get('updated'); // e.g., "last_month"
//   const sort = searchParams.get('sort') || 'best-match';
//   const page = searchParams.get('page') || '1';
//   const perPage = searchParams.get('per_page') || '10';

//   // Build GitHub search query
//   let query = q.trim();

//   if (language) query += ` language:${language}`;
//   if (starsMin && starsMax) query += ` stars:${starsMin}..${starsMax}`;
//   else if (starsMin) query += ` stars:>${starsMin}`;
//   else if (starsMax) query += ` stars:<${starsMax}`;

//   if (forksMin && forksMax) query += ` forks:${forksMin}..${forksMax}`;
//   if (updated === 'last_week') query += ` pushed:>${getDateAgo(7)}`;
//   if (updated === 'last_month') query += ` pushed:>${getDateAgo(30)}`;
//   if (updated === 'last_year') query += ` pushed:>${getDateAgo(365)}`;

//   const data = await GitHubService.searchRepos({
//     q: query,
//     sort,
//     order: 'desc',
//     per_page: perPage,
//     page,
//   });

//   return NextResponse.json(data);
// }

// function getDateAgo(days: number) {
//   const d = new Date();
//   d.setDate(d.getDate() - days);
//   return d.toISOString().split('T')[0];
// }

// app/api/search/route.ts
import { NextResponse } from 'next/server';
import { GitHubService } from '@/lib/github';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);

    // Parse query params
    const query = url.searchParams.get('query') || 'awesome';
    const language = url.searchParams.get('language') || undefined;
    const topic = url.searchParams.get('topic') || undefined;
    const minStars = url.searchParams.get('minStars') ? Number(url.searchParams.get('minStars')) : undefined;
    const minForks = url.searchParams.get('minForks') ? Number(url.searchParams.get('minForks')) : undefined;
    const sort = (url.searchParams.get('sort') as 'stars' | 'forks' | 'updated') || 'stars';
    const order = (url.searchParams.get('order') as 'desc' | 'asc') || 'desc';
    const dateRange = (url.searchParams.get('dateRange') as 'day' | 'week' | 'month' | 'year') || undefined;
    const page = url.searchParams.get('page') ? Number(url.searchParams.get('page')) : 1;

    const filters = { query, language, topic, minStars, minForks, sort, order, dateRange };
    const repos = await GitHubService.searchAwesomeRepos(filters, page);

    return NextResponse.json(repos);
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ error: 'Failed to fetch search results' }, { status: 500 });
  }
}
