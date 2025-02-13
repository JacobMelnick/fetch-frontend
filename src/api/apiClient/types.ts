export type HTTPMethod = "GET" | "POST";
export type Nullable<T> = null | T;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface RequestConfig<_T, K = null> {
  path: string;
  body?: K | null;
}
