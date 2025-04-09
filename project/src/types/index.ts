export * from './auth';
export * from './product';
export * from './cart';

export type ApiResponse<T> = {
  data: T;
  error: string | null;
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
};