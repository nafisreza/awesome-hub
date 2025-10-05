import { Octokit } from "@octokit/rest"

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN, // Will work without token (lower rate limits)
})

export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  topics: string[]
  created_at: string
  updated_at: string
  owner: {
    login: string
    avatar_url: string
  }
}

export interface SearchFilters {
  query?: string
  language?: string
  topic?: string
  minStars?: number
  minForks?: number
  sort?: "stars" | "forks" | "updated"
  order?: "desc" | "asc"
  dateRange?: "day" | "week" | "month" | "year"
}

export class GitHubService {
  static async searchAwesomeRepos(filters: SearchFilters = {}, page = 1, perPage = 50): Promise<GitHubRepo[]> {
    const {
      query = "awesome",
      language,
      topic,
      minStars,
      minForks,
      sort = "stars",
      order = "desc",
      dateRange,
    } = filters

    // Build advanced search query
    let searchQuery = `${query} in:name OR ${query} in:description`

    if (language) searchQuery += ` language:${language}`
    if (topic) searchQuery += ` topic:${topic}`
    if (minStars) searchQuery += ` stars:>=${minStars}`
    if (minForks) searchQuery += ` forks:>=${minForks}`

    if (dateRange) {
      const date = new Date()
      switch (dateRange) {
        case "day":
          date.setDate(date.getDate() - 1)
          break
        case "week":
          date.setDate(date.getDate() - 7)
          break
        case "month":
          date.setMonth(date.getMonth() - 1)
          break
        case "year":
          date.setFullYear(date.getFullYear() - 1)
          break
      }
      searchQuery += ` pushed:>${date.toISOString().split("T")[0]}`
    }

    try {
      const response = await octokit.rest.search.repos({
        q: searchQuery,
        sort,
        order,
        per_page: perPage,
        page,
      })

      return response.data.items as GitHubRepo[]
    } catch (error: unknown) {
      console.error("Error searching GitHub repos:", error)

      // Handle rate limiting and auth errors gracefully
      if (error && typeof error === "object" && "status" in error) {
        const httpError = error as { status: number; message: string }

        if (httpError.status === 403 && httpError.message.includes("rate limit")) {
          console.warn("GitHub API rate limit exceeded. Consider adding a GITHUB_TOKEN.")
        } else if (httpError.status === 401) {
          console.warn("GitHub API authentication failed. Check your GITHUB_TOKEN.")
        }
      }

      return []
    }
  }

  static async getRepoDetails(owner: string, repo: string): Promise<GitHubRepo | null> {
    try {
      const response = await octokit.rest.repos.get({
        owner,
        repo,
      })

      return response.data as GitHubRepo
    } catch (error) {
      console.error("Error fetching repo details:", error)
      return null
    }
  }

  static async searchAwesomeReposByTopic(topic: string): Promise<GitHubRepo[]> {
    try {
      const response = await octokit.rest.search.repos({
        q: `topic:${topic} awesome in:name OR awesome in:description`,
        sort: "stars",
        order: "desc",
        per_page: 30,
      })

      return response.data.items as GitHubRepo[]
    } catch (error) {
      console.error("Error searching repos by topic:", error)
      return []
    }
  }

  static async getTrendingAwesomeRepos(): Promise<GitHubRepo[]> {
    return this.searchAwesomeRepos({
      dateRange: "week",
      minStars: 10,
    })
  }

  // Get repos by specific categories (predefined topic combinations)
  static async getReposByCategory(category: string): Promise<GitHubRepo[]> {
    const categoryTopics: Record<string, string[]> = {
      frontend: ["react", "vue", "angular", "svelte", "frontend"],
      backend: ["nodejs", "express", "fastapi", "django", "backend"],
      mobile: ["react-native", "flutter", "swift", "kotlin", "mobile"],
      "ai-ml": ["machine-learning", "tensorflow", "pytorch", "ai", "ml"],
      devops: ["docker", "kubernetes", "devops", "ci-cd", "deployment"],
      database: ["database", "sql", "mongodb", "redis", "postgresql"],
    }

    const topics = categoryTopics[category] || [category]

    // Search for repos with any of these topics
    const promises = topics.map((topic) => this.searchAwesomeRepos({ topic, minStars: 50 }))

    const results = await Promise.all(promises)
    const allRepos = results.flat()

    // Remove duplicates and sort by stars
    const uniqueRepos = allRepos.filter((repo, index, self) => index === self.findIndex((r) => r.id === repo.id))

    return uniqueRepos.sort((a, b) => b.stargazers_count - a.stargazers_count)
  }

  // Get popular languages in awesome repos
  static async getPopularLanguages(): Promise<Array<{ language: string; count: number }>> {
    const repos = await this.searchAwesomeRepos({ minStars: 100 })
    const languageCounts: Record<string, number> = {}

    repos.forEach((repo) => {
      if (repo.language) {
        languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1
      }
    })

    return Object.entries(languageCounts)
      .map(([language, count]) => ({ language, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20)
  }
}

export { octokit }
