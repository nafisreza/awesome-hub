import RepoActionBar from '@/components/repo/repoHeader';
import RepoContributors from '@/components/repo/repoContributor';
import RelatedRepos from '@/components/repo/RelatedRepo';
import { GitHubService } from '@/lib/github';
import RepoReadme from '@/components/repo/repoReadme';
import RepoSidebarAbout from '@/components/repo/repoSidebar';
import { markdownToHtml } from '@/lib/markup';
import { Header } from '@/components/header';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ owner: string; name: string }>;
}): Promise<Metadata> {
  const { owner, name } = await params;

  try {
    const repo = await GitHubService.getRepoDetails(owner, name);

    if (!repo) {
      return {
        title: 'Repository Not Found',
      };
    }

    const title = `${repo.owner.login}/${repo.name}`;
    const description = repo.description || `Check out ${title} on GitHub`;

    const imageUrl = repo.owner.avatar_url;

    const enrichedDescription = [
      description,
      repo.stargazers_count > 0 ? `⭐ ${repo.stargazers_count.toLocaleString()} stars` : '',
      repo.language ? `• Written in ${repo.language}` : '',
    ]
      .filter(Boolean)
      .join(' ');

    return {
      title: title,
      description: enrichedDescription,
      openGraph: {
        title: title,
        description: enrichedDescription,
        url: repo.html_url,
        siteName: 'Awesome Hub',
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: `${title} repository`,
          },
        ],
        locale: 'en_US',
        type: 'website',
      },
      keywords: [
        repo.name,
        repo.owner.login,
        'github',
        'repository',
        ...(repo.topics || []),
        ...(repo.language ? [repo.language] : []),
      ],
      authors: [
        {
          name: repo.owner.login,
          url: repo.owner.html_url,
        },
      ],
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'GitHub Repository',
      description: 'Explore repositories on GitHub',
    };
  }
}

export default async function RepoDetailPage({ params }: { params: Promise<{ owner: string; name: string }> }) {
  const { owner, name } = await params;
  const repo = await GitHubService.getRepoDetails(owner, name);
  const readme = await GitHubService.getRepoReadme(owner, name);
  const related = await GitHubService.getRelatedRepos(owner, name);
  const parsed = readme ? await markdownToHtml(readme) : null;

  if (!repo) {
    return <div className="p-6 text-red-500">Repo not found.</div>;
  }

  return (
    <div className="bg-background min-h-screen w-full">
      <Header />
      <main className="container mx-auto mt-20 px-4 py-6">
        <RepoActionBar repo={repo} />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column: Readme */}
          <div className="order-2 col-span-2 space-y-6 lg:order-1">
            <RepoReadme readme={parsed} />
          </div>
          {/* Right Column */}
          <div className="order-1 space-y-6 lg:order-2">
            <RepoSidebarAbout repo={repo} />
            <RepoContributors owner={owner} name={name} />
            <RelatedRepos repos={related} />
          </div>
        </div>
      </main>
    </div>
  );
}
