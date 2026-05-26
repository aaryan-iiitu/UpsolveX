import apiClient from '@/lib/apiClient';
import { Contest, ContestAnalysis } from '@/types';

export const contestService = {
  async getContests(page: number = 1, limit: number = 10) {
    const response = await apiClient.get('/contests', {
      params: { page, limit },
    });
    return response.data.data;
  },

  async getContestById(contestId: string): Promise<Contest> {
    const response = await apiClient.get(`/contests/${contestId}`);
    return response.data.data;
  },

  async createContest(data: Partial<Contest>) {
    const response = await apiClient.post('/contests', data);
    return response.data.data;
  },

  async analyzeContest(contestId: string): Promise<ContestAnalysis> {
    const response = await apiClient.get(`/contests/${contestId}/analyze`);
    return response.data.data;
  },
};
