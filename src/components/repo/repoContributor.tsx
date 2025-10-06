'use client';

import { useEffect, useState } from 'react';
import { GitHubContributor, GitHubService } from '@/lib/github';
import Image from 'next/image';

interface Props {
  owner: string;
  name: string;
}

export default function RepoContributors({ owner, name }: Props) {
  const [contributors, setContributors] = useState<GitHubContributor[]>([]);
  const DISPLAY_TOTAL_COUNT = 606;
  const MAX_AVATARS_DISPLAY = 14;

  useEffect(() => {
    const loadContributors = async () => {
      if (contributors.length === 0) {
        const initialData = await GitHubService.getRepoContributors(owner, name, 1, MAX_AVATARS_DISPLAY);
        setContributors(initialData);
      }
    };
    loadContributors();
  }, [owner, name, contributors.length]);

  const remainingContributors = DISPLAY_TOTAL_COUNT - contributors.length;

  return (
    <div className="space-y-4 rounded-xl border bg-white p-4 sm:p-6 md:p-8">
      <h2 className="flex items-baseline gap-2 text-lg font-semibold text-gray-700 sm:text-xl md:text-2xl">
        Contributors
        <span className="text-sm font-normal text-gray-400 sm:text-base md:text-lg">
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
            className="block transition-opacity hover:opacity-80"
          >
            <div className="relative h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12">
              <Image
                src={c.avatar_url}
                alt={c.login}
                fill
                className="rounded-full border-2 border-transparent object-cover hover:border-blue-500"
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
            className="text-xs font-medium text-blue-500 transition-colors hover:text-blue-300 sm:text-sm md:text-base"
          >
            + {remainingContributors.toLocaleString()} contributors
          </a>
        </div>
      )}
    </div>
  );
}
