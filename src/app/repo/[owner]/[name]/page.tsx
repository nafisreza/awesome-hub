import RepoActionBar from '@/components/repo/repoHeader';
import RepoContributors from '@/components/repo/repoContributor';
import RelatedRepos from '@/components/repo/RelatedRepo';
import { GitHubService } from '@/lib/github';
import RepoReadme from '@/components/repo/repoReadme';
import RepoSidebarAbout from '@/components/repo/repoSidebar';
import { markdownToHtml } from '@/lib/markup';
import { Header } from '@/components/header';

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
