import { Skeleton } from '@/components/ui/skeleton';

export function FeaturedReposSkeleton() {
  return (
    <section className="mb-16">
      <h2 className="mb-8 text-center text-3xl font-bold">Featured Repositories</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="glass-strong rounded-xl p-6 shadow-lg">
            <Skeleton className="mb-2 h-5 w-3/4" />
            <Skeleton className="mb-4 h-3 w-1/2" />
            <Skeleton className="mb-2 h-3 w-full" />
            <Skeleton className="mb-4 h-3 w-5/6" />
            <div className="mb-4 flex gap-2">
              <Skeleton className="h-5 w-12 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-10 rounded-full" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <Skeleton className="h-3 w-10" />
                <Skeleton className="h-3 w-10" />
              </div>
              <Skeleton className="h-3 w-12" />
            </div>
            <div className="mt-3 border-t border-border pt-3">
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
