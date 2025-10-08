import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function ContributorsSkeleton() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header skeleton */}
        <div className="text-center mb-12">
          <Skeleton className="h-8 w-48 mx-auto mb-4" />
          <Skeleton className="h-10 w-80 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>

        {/* Contributors grid skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-8">
          {[...Array(12)].map((_, i) => (
            <Card key={i} className="glass-strong border-0 p-4">
              <CardContent className="p-0 flex flex-col items-center">
                {/* Avatar skeleton */}
                <Skeleton className="h-20 w-20 rounded-full mb-3" />
                {/* Username skeleton */}
                <Skeleton className="h-4 w-20 mb-2" />
                {/* Contributions skeleton */}
                <Skeleton className="h-3 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View all button skeleton */}
        <div className="text-center">
          <Skeleton className="h-10 w-48 mx-auto rounded-lg" />
        </div>
      </div>
    </section>
  );
}
