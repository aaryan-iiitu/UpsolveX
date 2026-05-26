// API Response wrapper for consistent responses
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  statusCode: number;
}

export class ApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const successResponse = <T>(
  data: T,
  message: string = 'Success',
  statusCode: number = 200,
): ApiResponse<T> => {
  return {
    success: true,
    message,
    data,
    statusCode,
  };
};

export const errorResponse = (
  message: string,
  statusCode: number = 500,
  error?: string,
): ApiResponse => {
  return {
    success: false,
    message,
    error: error || message,
    statusCode,
  };
};
