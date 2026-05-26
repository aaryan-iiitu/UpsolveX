import { useEffect, useState } from 'react';
import { contestService } from '@/services/contestService';
import { Contest } from '@/types';

interface ContestsData {
  contests: Contest[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export function useContests(page: number = 1, limit: number = 10) {
  const [data, setData] = useState<ContestsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        setLoading(true);
        const result = await contestService.getContests(page, limit);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch contests');
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, [page, limit]);

  return { data, loading, error };
}

export function useContestAnalysis(contestId: string) {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        setLoading(true);
        const result = await contestService.analyzeContest(contestId);
        setAnalysis(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch analysis');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [contestId]);

  return { analysis, loading, error };
}
