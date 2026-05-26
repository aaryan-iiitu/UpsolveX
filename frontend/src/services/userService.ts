import apiClient from '@/lib/apiClient';
import { User, UserStats, UserPreferences } from '@/types';

export const userService = {
  async getProfile(): Promise<User> {
    const response = await apiClient.get('/users/profile');
    return response.data.data;
  },

  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await apiClient.put('/users/profile', data);
    return response.data.data;
  },

  async getStats(): Promise<UserStats> {
    const response = await apiClient.get('/users/stats');
    return response.data.data;
  },

  async getPreferences(): Promise<UserPreferences> {
    const response = await apiClient.get('/users/preferences');
    return response.data.data;
  },

  async updatePreferences(data: Partial<UserPreferences>): Promise<UserPreferences> {
    const response = await apiClient.put('/users/preferences', data);
    return response.data.data;
  },
};
