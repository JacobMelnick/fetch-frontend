export type HTTPMethod = "GET" | "POST";
export type Nullable<T> = null | T;
export interface RequestConfig<_T, K = null> {
  path: string;
  body?: K | null;
}
