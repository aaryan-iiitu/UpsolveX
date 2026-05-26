import apiClient from '@/lib/apiClient';
import { Problem } from '@/types';

export const problemService = {
  async getProblems(page: number = 1, limit: number = 10) {
    const response = await apiClient.get('/problems', {
      params: { page, limit },
    });
    return response.data.data;
  },

  async getProblemById(problemId: string): Promise<Problem> {
    const response = await apiClient.get(`/problems/${problemId}`);
    return response.data.data;
  },

  async createProblem(data: Partial<Problem>) {
    const response = await apiClient.post('/problems', data);
    return response.data.data;
  },

  async updateProblemProgress(
    problemId: string,
    data: { solved: boolean; solveDate?: string },
  ) {
    const response = await apiClient.put(`/problems/${problemId}/progress`, data);
    return response.data.data;
  },

  async getSolvedProblems() {
    const response = await apiClient.get('/problems/solved');
    return response.data.data;
  },

  async getProblemsByDifficulty(difficulty: string) {
    const response = await apiClient.get(`/problems/difficulty/${difficulty}`);
    return response.data.data;
  },
};
