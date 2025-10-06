import { Skeleton } from '@/components/ui/skeleton';
import { Header } from '@/components/header';

export function RepoDetailSkeleton() {
  return (
    <div className="bg-background min-h-screen w-full">
      <Header />

      <main className="container mx-auto mt-20 px-4 py-6">
        {/* Action bar skeleton */}
        <Skeleton className="mb-6 h-16 w-full rounded-xl" />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column - README skeleton */}
          <div className="order-2 col-span-2 space-y-6 lg:order-1">
            <div className="bg-card space-y-4 rounded-xl border p-6">
              <Skeleton className="mb-4 h-6 w-24" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <div className="mt-6 space-y-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar components */}
          <div className="order-1 space-y-6 lg:order-2">
            {/* About section skeleton */}
            <div className="bg-card space-y-4 rounded-xl border p-6">
              <Skeleton className="mb-3 h-6 w-16" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <div className="mt-3 flex flex-wrap gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-14 rounded-full" />
              </div>
            </div>

            {/* Contributors skeleton */}
            <div className="bg-card space-y-4 rounded-xl border p-6">
              <Skeleton className="h-6 w-24" />
              <div className="flex flex-wrap gap-2">
                {[...Array(8)].map((_, i) => (
                  <Skeleton key={i} className="h-8 w-8 rounded-full" />
                ))}
              </div>
            </div>

            {/* Related repos skeleton */}
            <div className="bg-card space-y-4 rounded-xl border p-6">
              <Skeleton className="h-6 w-32" />
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-2 rounded-lg border p-4">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
