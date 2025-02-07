export type HTTPMethod = "GET" | "POST";
export type Nullable<T> = null | T;
export interface RequestConfig<T = null> {
  path: string;
  body?: T | null;
}
