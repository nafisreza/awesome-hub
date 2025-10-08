import { Skeleton } from "@/components/ui/skeleton";

export function ContributorsSkeleton() {
  return (
    <section className="relative py-24 px-6">
      {/* Background elements */}
      <div className="absolute inset-0 gradient-mesh opacity-20" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header skeleton */}
        <div className="text-center mb-16">
          <Skeleton className="h-8 w-64 mx-auto mb-4 rounded-full" />
          <Skeleton className="h-12 w-96 mx-auto mb-6" />
          <Skeleton className="h-6 w-[500px] mx-auto" />
        </div>

        {/* Contributors grid skeleton */}
        <div className="mb-12">
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-4 sm:gap-5 max-w-xl mx-auto">
            {[...Array(14)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full" />
            ))}
          </div>
        </div>

        {/* Footer stats card skeleton */}
        <div className="glass-strong rounded-2xl p-6 md:p-8 border border-border/50 max-w-[800px] mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <Skeleton className="h-12 w-12 sm:h-16 sm:w-16 rounded-2xl" />
                <div>
                  <Skeleton className="h-8 sm:h-10 w-16 sm:w-20 mb-2" />
                  <Skeleton className="h-3 sm:h-4 w-28 sm:w-32" />
                </div>
              </div>
              
              <div className="hidden sm:block w-px h-16 bg-border" />
              
              <div className="flex items-center gap-3 sm:gap-4">
                <Skeleton className="h-12 w-12 sm:h-16 sm:w-16 rounded-2xl" />
                <div>
                  <Skeleton className="h-8 sm:h-10 w-16 sm:w-20 mb-2" />
                  <Skeleton className="h-3 sm:h-4 w-28 sm:w-32" />
                </div>
              </div>
            </div>
            
            <Skeleton className="h-12 w-full sm:w-48 rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
