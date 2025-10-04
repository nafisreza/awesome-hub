import { Skeleton } from "@/components/ui/skeleton";
import { Header } from '@/components/header';

export default function RepoDetailLoading() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Header />

      <main className="p-6">
        <Skeleton className="h-6 w-1/3 mb-6" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <Skeleton className="bg-gray-200 dark:bg-gray-700 h-64 w-full rounded-lg mb-4" />
            <Skeleton className="bg-gray-200 dark:bg-gray-700 h-64 w-full rounded-lg mb-4" />
            <Skeleton className="bg-gray-200 dark:bg-gray-700 h-64 w-full rounded-lg mb-4" />
          </div>

          <div className="space-y-6">
            <Skeleton className="bg-gray-200 dark:bg-gray-700 h-32 w-full rounded-lg mb-4" /> {/* Sidebar */}
            <Skeleton className="bg-gray-200 dark:bg-gray-700 h-40 w-full rounded-lg mb-4" /> {/* Contributors */}
            <Skeleton className="bg-gray-200 dark:bg-gray-700 h-48 w-full rounded-lg mb-4" /> {/* Related Repos */}
          </div>
        </div>
      </main>
    </div>
  );
}
