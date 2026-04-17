export type CustomApiResponse<T = null> = {
  data?: T | null;
  message: string;
  errors?: any[] | null;
  status: number;
};
