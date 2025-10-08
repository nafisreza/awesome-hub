import { NextResponse } from "next/server";
import { GitHubService } from "@/lib/github";
import { cacheFirst } from "@/lib/cache";

export async function GET() {
  try {
    // Cache contributors for 1 hour since they don't change frequently
    const contributors = await cacheFirst(
      "awesome-hub-contributors",
      async () => {
        return await GitHubService.getProjectContributors();
      },
      60, // Cache for 1 hour
    );

    return NextResponse.json(contributors);
  } catch (error) {
    console.error("Contributors error:", error);
    return NextResponse.json(
      { error: "Failed to fetch contributors" },
      { status: 500 },
    );
  }
}
