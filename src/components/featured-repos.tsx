"use client";

import { useState, useEffect } from "react";
import { Star, GitFork, ExternalLink, Calendar, Clipboard, ClipboardCheck } from "lucide-react";
import { GitHubRepo as Repository } from "@/lib/github";
import { formatNumber, formatDate } from "@/lib/utils";
import { useBookmarks } from "@/hooks/useBookmarks";
import { FeaturedReposSkeleton } from "@/components/skeletons/FeaturedReposSkeleton";
import { toast } from "sonner";
import Link from "next/link";


export function FeaturedRepos() {
	const [repos, setRepos] = useState<Repository[]>([]);
	const [loading, setLoading] = useState(true);
	const { bookmarks, addBookmark, removeBookmark } = useBookmarks();
	const isBookmarked = (id: number) => bookmarks.some((b) => b.id === id);
	const [copiedRepoId, setCopiedRepoId] = useState<number | null>(null);

	useEffect(() => {
		const fetchFeaturedRepos = async () => {
			try {
				setLoading(true);
				const response = await fetch("/api/featured");
				if (!response.ok) {
					throw new Error("Failed to fetch featured repositories");
				}
				const data = await response.json();
				setRepos(data);
			} catch (error) {
				console.error("Error fetching featured repos:", error);
				setRepos([]);
			} finally {
				setLoading(false);
			}
		};

		fetchFeaturedRepos();
	}, []);

	const handleCopyURL = (repo: Repository) => {
		navigator.clipboard.writeText(repo.html_url);
		setCopiedRepoId(repo.id);
		toast.success("Repository URL copied to clipboard");
		setTimeout(() => {
			setCopiedRepoId((current) => (current === repo.id ? null : current));
		}, 800);
	};

	if (loading) {
		return <FeaturedReposSkeleton />;
	}

	return (
		<section className="mb-16">
			<h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Featured Repositories</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{repos.map((repo) => (
					<div
						key={repo.id}
						className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200"
					>
						<div className="flex items-start justify-between gap-2 mb-4">
							<div className="flex-1">
								<Link href={`/repo/${repo.owner.login}/${repo.name}`}>
									<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">{repo.name}</h3>
								</Link>
								<p className="text-sm text-gray-600 dark:text-gray-400">{repo.full_name}</p>
							</div>
							<button
								aria-label="Copy repository URL"
								onClick={() => handleCopyURL(repo)}
								className=" text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors cursor-pointer"
							>
								{copiedRepoId === repo.id ? (
									<ClipboardCheck
										aria-label="Copied"
										className="size-5 text-green-500 transition-transform duration-200 scale-110"
									/>
								) : (
									<Clipboard aria-label="Copy repository URL" className="size-5" />
								)}
							</button>
							<button
								aria-label={isBookmarked(repo.id) ? "Remove bookmark" : "Add bookmark"}
								onClick={() => (isBookmarked(repo.id) ? removeBookmark(repo.id) : addBookmark(repo))}
							>
								<Star
									size={20}
									className={`transition-colors ${
										isBookmarked(repo.id) ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
									}`}
								/>
							</button>

							<a
								href={repo.html_url}
								target="_blank"
								rel="noopener noreferrer"
								className="mt-0.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
							>
								<ExternalLink className="size-4.5" />
							</a>
						</div>

						<p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-2">
							{repo.description || "No description available"}
						</p>

						<div className="flex flex-wrap gap-1 mb-4">
							{repo.topics.slice(0, 3).map((topic) => (
								<span
									key={topic}
									className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
								>
									{topic}
								</span>
							))}
							{repo.topics.length > 3 && (
								<span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
									+{repo.topics.length - 3}
								</span>
							)}
						</div>

						<div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
							<div className="flex items-center gap-4">
								<div className="flex items-center gap-1">
									<Star className="w-4 h-4" />
									<span>{formatNumber(repo.stargazers_count)}</span>
								</div>
								<div className="flex items-center gap-1">
									<GitFork className="w-4 h-4" />
									<span>{formatNumber(repo.forks_count)}</span>
								</div>
							</div>
							<div className="flex items-center gap-1">
								<Calendar className="w-4 h-4" />
								<span>{formatDate(repo.updated_at, { month: "short", day: "numeric" })}</span>
							</div>
						</div>

						{repo.language && (
							<div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
								<span className="inline-flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
									<div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"></div>
									{repo.language || "Unknown"}
								</span>
							</div>
						)}
					</div>
				))}
			</div>

			<div className="text-center mt-8">
				<button className="px-6 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors font-medium">
					View All Repositories
				</button>
			</div>
		</section>
	);
}
