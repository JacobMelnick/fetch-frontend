import { ResponseWrapper } from "./ResponseWrapper";
import { HTTPMethod, Nullable, RequestConfig } from "./types";

const baseURL = "https://frontend-take-home-service.fetch.com";

const buildRequest = (
  method: HTTPMethod,
  body: Nullable<unknown>
): RequestInit => {
  const headers = new Headers();

  const request: RequestInit = {
    headers,
    method,
    redirect: "manual",
  };

  if (!body) {
    return request;
  }

  request.body = JSON.stringify(body);

  return request;
};

async function sendRequest<T>(
  path: string,
  config: RequestInit
): Promise<ResponseWrapper<T>> {
  const url = `${baseURL}${path}`;

  try {
    const response = await fetch(url, config);
    const statusCode = response.status;
    const message = response.statusText;
    let data = null;
    let error = null;

    if (response.ok && response.body) {
      try {
        data = await response.json();
      } catch (e: unknown) {
        error = e as string;
      }
    }

    return new ResponseWrapper<T>(statusCode, data ?? null, error, message);
  } catch (e: unknown) {
    throw new Error(e as string);
  }
}

export class ApiClient {
  static async get<T>({
    path,
    body,
  }: RequestConfig<T>): Promise<ResponseWrapper<T>> {
    return sendRequest<T>(path, buildRequest("GET", body));
  }
  static async post<T>({
    path,
    body,
  }: RequestConfig<T>): Promise<ResponseWrapper<T>> {
    return sendRequest<T>(path, buildRequest("POST", body));
  }
}
