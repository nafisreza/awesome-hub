import { Skeleton } from "@/components/ui/skeleton";

export function FeaturedReposSkeleton() {
  return (
    <section className='mb-16'>
      <h2 className='text-3xl font-bold text-center mb-8'>
        Featured Repositories
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className='bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg'
          >
            <Skeleton className='h-5 w-3/4 mb-2' />
            <Skeleton className='h-3 w-1/2 mb-4' />
            <Skeleton className='h-3 w-full mb-2' />
            <Skeleton className='h-3 w-5/6 mb-4' />
            <div className='flex gap-2 mb-4'>
              <Skeleton className='h-5 w-12 rounded-full' />
              <Skeleton className='h-5 w-16 rounded-full' />
              <Skeleton className='h-5 w-10 rounded-full' />
            </div>
            <div className='flex justify-between items-center'>
              <div className='flex gap-4'>
                <Skeleton className='h-3 w-10' />
                <Skeleton className='h-3 w-10' />
              </div>
              <Skeleton className='h-3 w-12' />
            </div>
            <div className='mt-3 pt-3 border-t border-gray-200 dark:border-gray-700'>
              <Skeleton className='h-3 w-20' />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}