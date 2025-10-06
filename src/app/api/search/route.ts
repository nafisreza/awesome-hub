import { NextResponse } from "next/server"
import { GitHubService } from "@/lib/github"

const CATEGORY_TO_TOPIC: Record<string, string> = {
  javascript: "javascript",
  python: "python",
  react: "react",
  "machine-learning": "machine-learning",
  security: "security",
  devops: "devops",
  css: "css",
  go: "go",
  rust: "rust",
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const q = (url.searchParams.get("q") || "").trim()
    const category = url.searchParams.get("category") || "all"
    const page = Math.max(1, Number(url.searchParams.get("page") || 1))
    const perPageRaw = Number(url.searchParams.get("per_page") || 10)
    const per_page = Math.max(1, Math.min(50, perPageRaw)) // keep <= 50 to be nice to the API

    // GitHub Search API only allows access to the first 1000 results
    const GITHUB_SEARCH_CAP = 1000
    if ((page - 1) * per_page >= GITHUB_SEARCH_CAP) {
      return NextResponse.json(
        {
          items: [],
          totalCount: GITHUB_SEARCH_CAP,
          hasMore: false,
          message: "Only the first 1,000 search results are available from the GitHub Search API.",
        },
        { status: 200 },
      )
    }

    const filters = {
      query: q || "awesome",
      ...(category !== "all" && CATEGORY_TO_TOPIC[category] ? { topic: CATEGORY_TO_TOPIC[category] } : {}),
      // Default sort we use in UI
      sort: "stars" as const,
      order: "desc" as const,
    }

    const { items, totalCount, rate } = await GitHubService.searchAwesomeReposWithMeta(filters, page, per_page)

    const cappedTotal = Math.min(totalCount, GITHUB_SEARCH_CAP)
    const hasMore = page * per_page < cappedTotal

    return NextResponse.json({
      items,
      totalCount: cappedTotal,
      hasMore,
      rate,
      authenticated: !!process.env.GITHUB_TOKEN,
    })
  } catch (error: any) {
    const status = error?.status ?? 500
    const message =
      error?.message || "Failed to fetch search results from GitHub. You may be rate-limited. Try again later."

    // Map 403 abuse detection / rate limit to 429 for the client
    const mappedStatus = status === 403 ? 429 : status

    return NextResponse.json({ items: [], totalCount: 0, hasMore: false, error: message }, { status: mappedStatus })
  }
}
