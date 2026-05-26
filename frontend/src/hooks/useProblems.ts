import { useEffect, useState } from 'react';
import { problemService } from '@/services/problemService';
import { Problem } from '@/types';

interface ProblemsData {
  problems: Problem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export function useProblems(page: number = 1, limit: number = 10) {
  const [data, setData] = useState<ProblemsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        setLoading(true);
        const result = await problemService.getProblems(page, limit);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch problems');
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, [page, limit]);

  return { data, loading, error };
}

export function useSolvedProblems() {
  const [data, setData] = useState<{ count: number; problems: Problem[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSolvedProblems = async () => {
      try {
        setLoading(true);
        const result = await problemService.getSolvedProblems();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch solved problems');
      } finally {
        setLoading(false);
      }
    };

    fetchSolvedProblems();
  }, []);

  return { data, loading, error };
}
