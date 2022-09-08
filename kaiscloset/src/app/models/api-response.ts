export interface APIResponse<T = any> {
  status: string;
  message?: string;
  data?: { [key: string]: T };
}
