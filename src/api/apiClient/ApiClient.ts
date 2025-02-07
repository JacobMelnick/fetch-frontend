import { ResponseWrapper } from "./ResponseWrapper";
import { HTTPMethod, Nullable, RequestConfig } from "./types";

const baseURL = "https://frontend-take-home-service.fetch.com";

const buildRequest = (
  method: HTTPMethod,
  body: Nullable<unknown>
): RequestInit => {
  const headers = new Headers();
  //   const accessToken =
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9zaCIsImVtYWlsIjoiam9zaE1AZ21haWwuY29tIiwiaWF0IjoxNzM4OTYzNjY4LCJleHAiOjE3Mzg5NjcyNjh9.j5kTX_SRNK1XhcJ9GkyhLYh0eb1RnNtWrUQXbr4CrhA";

  //   headers.append("Authorization", `Bearer ${accessToken}`);
  headers.append("Content-Type", "application/json");
  const request: RequestInit = {
    headers,
    method,
    credentials: "include",
    redirect: "manual",
  };

  if (!body) {
    return request;
  }

  request.body = JSON.stringify(body);

  return request;
};

async function sendRequest<T, _K>(
  path: string,
  config: RequestInit
): Promise<ResponseWrapper<T>> {
  const url = `${baseURL}${path}`;

  try {
    const response = await fetch(url, config);
    console.log("fetch response:");
    console.log(response);
    const statusCode = response.status;
    const message = response.statusText;
    let data = null;
    let error = null;
    console.log("get set cookies", response);

    if (response.ok && response.body) {
      try {
        data = await response.json();
        console.log("response json: ");
        console.log(data);
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
  static async get<T, K>({
    path,
    body,
  }: RequestConfig<T>): Promise<ResponseWrapper<T>> {
    return sendRequest<T, K>(path, buildRequest("GET", body));
  }
  static async post<T, K>({
    path,
    body,
  }: RequestConfig<T, K>): Promise<ResponseWrapper<T>> {
    return sendRequest<T, K>(path, buildRequest("POST", body));
  }
}
