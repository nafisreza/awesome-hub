import { NextResponse } from 'next/server'
import { GitHubService } from '@/lib/github'
import { cacheFirst } from '@/lib/cache'

export async function GET (req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const q = searchParams.get('q') || 'awesome'
    const page = parseInt(searchParams.get('page') || '1')
    const per_page = parseInt(searchParams.get('per_page') || '10')
    const language = searchParams.get('language') || undefined
    const minStars = searchParams.get('minStars')
      ? parseInt(searchParams.get('minStars')!)
      : undefined
    const maxStars = searchParams.get('maxStars')
      ? parseInt(searchParams.get('maxStars')!)
      : undefined
    const minForks = searchParams.get('minForks')
      ? parseInt(searchParams.get('minForks')!)
      : undefined
    const maxForks = searchParams.get('maxForks')
      ? parseInt(searchParams.get('maxForks')!)
      : undefined
    const hasTopics = searchParams.get('hasTopics')
      ? searchParams.get('hasTopics') === 'true'
      : undefined

    const cacheKey = `search:${q}:${language}:${minStars || ''}:${
      maxStars || ''
    }:${minForks || ''}:${maxForks || ''}:${hasTopics}:${page}:${per_page}`

    const results = await cacheFirst(
      cacheKey,
      async () => {
        const filters = {
          query: q,
          language,
          minStars,
          maxStars,
          minForks,
          maxForks,
          hasTopics
        }
        const repos = await GitHubService.searchAwesomeRepos(
          filters as any,
          page,
          per_page
        )
        return repos
      },
      5 // cache 5 minutes
    )

    return NextResponse.json({ items: results })
  } catch (error) {
    console.error('API search error:', error)
    return NextResponse.json({ error: 'Failed to search' }, { status: 500 })
  }
}
