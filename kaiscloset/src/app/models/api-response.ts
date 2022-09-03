export interface APIResponse<T = any> {
  status: number;
  message: string;
  data: { [key: string]: T };
}
