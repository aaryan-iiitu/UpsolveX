'use client';

import { useProblems } from '@/hooks/useProblems';
import { ProblemCard } from '@/components/dashboard/ProblemCard';
import { CardSkeleton } from '@/components/ui/Skeleton';

export default function ProblemsPage() {
  const { data, loading } = useProblems();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Problems</h1>
        <p className="text-muted-foreground">Problems you've attempted and tracked.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(8)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : data?.problems && data.problems.length > 0 ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.problems.map((problem) => (
              <ProblemCard key={problem.id} problem={problem} />
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
          <p className="text-muted-foreground">No problems found.</p>
        </div>
      )}
    </div>
  );
}
