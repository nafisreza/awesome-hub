
"use client"

import { useEffect, useState } from "react"
import { GitHubContributor, GitHubService } from "@/lib/github"
import Image from "next/image"

interface Props {
  owner: string
  name: string
}

export default function RepoContributors({ owner, name }: Props) {
  const [contributors, setContributors] = useState<GitHubContributor[]>([])
  const DISPLAY_TOTAL_COUNT = 606
  const MAX_AVATARS_DISPLAY = 14

  useEffect(() => {
    const loadContributors = async () => {
      if (contributors.length === 0) {
        const initialData = await GitHubService.getRepoContributors(owner, name, 1, MAX_AVATARS_DISPLAY)
        setContributors(initialData)
      }
    }
    loadContributors()
  }, [owner, name, contributors.length])

  const remainingContributors = DISPLAY_TOTAL_COUNT - contributors.length

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 space-y-4 border">
      
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700 flex items-baseline gap-2">
        Contributors
        <span className="text-sm sm:text-base md:text-lg text-gray-400 font-normal">
          {DISPLAY_TOTAL_COUNT.toLocaleString()}
        </span>
      </h2>
      
      <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
        {contributors.slice(0, MAX_AVATARS_DISPLAY).map((c) => (
          <a
            key={c.login}
            href={c.html_url}
            target="_blank"
            title={c.login}
            className="block hover:opacity-80 transition-opacity"
          >
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
              <Image
                src={c.avatar_url}
                alt={c.login}
                fill
                className="rounded-full object-cover border-2 border-transparent hover:border-blue-500"
              />
            </div>
          </a>
        ))}
      </div>

      {DISPLAY_TOTAL_COUNT > contributors.length && (
        <div className="pt-2">
          <a
            href={`https://github.com/${owner}/${name}/graphs/contributors`}
            target="_blank"
            className="text-blue-500 hover:text-blue-300 transition-colors text-xs sm:text-sm md:text-base font-medium"
          >
            + {remainingContributors.toLocaleString()} contributors
          </a>
        </div>
      )}
    </div>
  )
}
