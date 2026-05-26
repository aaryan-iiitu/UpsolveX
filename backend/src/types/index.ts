export interface RequestUser {
  id: string;
  email: string;
  role: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface FilterParams {
  [key: string]: any;
}

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: RequestUser;
      pagination?: PaginationParams;
    }
  }
}
