'use client';

import { useContests } from '@/hooks/useContests';
import { ContestCard } from '@/components/dashboard/ContestCard';
import { ContestCardSkeleton } from '@/components/ui/Skeleton';

export default function ContestsPage() {
  const { data, loading } = useContests();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Contests</h1>
        <p className="text-muted-foreground">Your competitive programming contests history.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(8)].map((_, i) => (
            <ContestCardSkeleton key={i} />
          ))}
        </div>
      ) : data?.contests && data.contests.length > 0 ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.contests.map((contest) => (
              <ContestCard key={contest.id} contest={contest} />
            ))}
          </div>
          {data.pagination.pages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {/* Pagination component would go here */}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-secondary/50 rounded-lg p-8 text-center">
          <p className="text-muted-foreground">No contests found.</p>
        </div>
      )}
    </div>
  );
}
