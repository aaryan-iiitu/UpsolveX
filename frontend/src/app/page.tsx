'use client';

import { useUserStats } from '@/hooks/useUser';
import { useContests } from '@/hooks/useContests';
import { useProblems } from '@/hooks/useProblems';
import { StatsOverview } from '@/components/dashboard/StatsOverview';
import { ContestCard } from '@/components/dashboard/ContestCard';
import { ProblemCard } from '@/components/dashboard/ProblemCard';
import { CardSkeleton, ContestCardSkeleton } from '@/components/ui/Skeleton';

export default function Dashboard() {
  const { stats, loading: statsLoading } = useUserStats();
  const { data: contestsData, loading: contestsLoading } = useContests();
  const { data: problemsData, loading: problemsLoading } = useProblems();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your competitive programming progress.</p>
      </div>

      {/* Stats Overview */}
      {statsLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : stats ? (
        <StatsOverview stats={stats} />
      ) : null}

      {/* Recent Contests */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Recent Contests</h2>
        {contestsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <ContestCardSkeleton key={i} />
            ))}
          </div>
        ) : contestsData?.contests && contestsData.contests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contestsData.contests.slice(0, 4).map((contest) => (
              <ContestCard key={contest.id} contest={contest} />
            ))}
          </div>
        ) : (
          <div className="bg-secondary/50 rounded-lg p-8 text-center">
            <p className="text-muted-foreground">No contests yet. Start by adding your first contest!</p>
          </div>
        )}
      </div>

      {/* Recent Problems */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Recent Problems</h2>
        {problemsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : problemsData?.problems && problemsData.problems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {problemsData.problems.slice(0, 4).map((problem) => (
              <ProblemCard key={problem.id} problem={problem} />
            ))}
          </div>
        ) : (
          <div className="bg-secondary/50 rounded-lg p-8 text-center">
            <p className="text-muted-foreground">No problems yet. Start tracking your problems!</p>
          </div>
        )}
      </div>
    </div>
  );
}
