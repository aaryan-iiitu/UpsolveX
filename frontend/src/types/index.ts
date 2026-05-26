// User types
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserStats {
  id: string;
  userId: string;
  totalContests: number;
  totalProblems: number;
  solvedProblems: number;
  maxRating: number;
  currentRating: number;
  accuracy: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  id: string;
  userId: string;
  theme: 'light' | 'dark' | 'system';
  language: string;
  emailNotifications: boolean;
  privacyLevel: 'public' | 'private';
  createdAt: string;
  updatedAt: string;
}

// Contest types
export interface Contest {
  id: string;
  userId: string;
  contestId: string;
  name: string;
  platform: string;
  rating?: number;
  rank?: number;
  ratingChange?: number;
  startTime: string;
  endTime: string;
  isVirtual: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ContestAnalysis {
  totalProblems: number;
  solvedCount: number;
  accuracy: number;
  recommendations: string[];
  strengths: string[];
  weaknesses: string[];
}

// Problem types
export interface Problem {
  id: string;
  userId: string;
  externalId: string;
  platform: string;
  name: string;
  link?: string;
  difficulty?: string;
  tags: string[];
  statement?: string;
  solved: boolean;
  solveDate?: string;
  isFavorite: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Submission {
  id: string;
  userId: string;
  contestId?: string;
  problemId: string;
  verdict: string;
  language: string;
  code?: string;
  runtime?: number;
  memory?: number;
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Recommendation {
  id: string;
  problemId: string;
  title: string;
  description: string;
  type: 'concept' | 'practice' | 'editorial' | 'discussion';
  url?: string;
  priority: 'low' | 'medium' | 'high';
  isCompleted: boolean;
  nextReviewDate?: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  statusCode: number;
}

export interface PaginationResponse<T> {
  items: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}
