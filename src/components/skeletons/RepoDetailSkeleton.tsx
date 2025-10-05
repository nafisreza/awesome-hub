import { Skeleton } from "@/components/ui/skeleton";
import { Header } from '@/components/header';

export function RepoDetailSkeleton() {
  return (
    <div className="min-h-screen w-full bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6 mt-20">
        {/* Action bar skeleton */}
        <Skeleton className="h-16 w-full rounded-xl mb-6" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - README skeleton */}
          <div className="col-span-2 order-2 lg:order-1 space-y-6">
            <div className="bg-card rounded-xl p-6 space-y-4 border">
              <Skeleton className="h-6 w-24 mb-4" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <div className="space-y-2 mt-6">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar components */}
          <div className="order-1 lg:order-2 space-y-6">
            {/* About section skeleton */}
            <div className="bg-card rounded-xl p-6 space-y-4 border">
              <Skeleton className="h-6 w-16 mb-3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <div className="flex flex-wrap gap-2 mt-3">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-14 rounded-full" />
              </div>
            </div>

            {/* Contributors skeleton */}
            <div className="bg-card rounded-xl p-6 space-y-4 border">
              <Skeleton className="h-6 w-24" />
              <div className="flex flex-wrap gap-2">
                {[...Array(8)].map((_, i) => (
                  <Skeleton key={i} className="h-8 w-8 rounded-full" />
                ))}
              </div>
            </div>

            {/* Related repos skeleton */}
            <div className="bg-card rounded-xl p-6 space-y-4 border">
              <Skeleton className="h-6 w-32" />
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="p-4 rounded-lg border space-y-2">
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