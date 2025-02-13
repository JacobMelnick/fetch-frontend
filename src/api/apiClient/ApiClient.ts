import Router from "next/router";
import { ResponseWrapper } from "./ResponseWrapper";
import { HTTPMethod, Nullable, RequestConfig } from "./types";

const baseURL = "https://frontend-take-home-service.fetch.com";

const buildRequest = (
  method: HTTPMethod,
  body: Nullable<unknown>
): RequestInit => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const request: RequestInit = {
    headers,
    method,
    credentials: "include", // Ensures cookies are sent
    redirect: "manual", // Prevents automatic redirects
  };

  if (body) {
    request.body = JSON.stringify(body);
  }

  return request;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function sendRequest<T, _K>(
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

    if (statusCode === 401) {
      console.warn("Unauthorized request. Redirecting to login...");
      Router.push("/login");
      return new ResponseWrapper<T>(statusCode, null, "Unauthorized", message);
    }

    if (
      response.ok &&
      response.headers.get("content-type")?.includes("application/json")
    ) {
      try {
        data = await response.json();
      } catch {
        error = "Failed to parse response JSON";
      }
    } else {
      error = message || "Request failed";
    }

    return new ResponseWrapper<T>(statusCode, data ?? null, error, message);
  } catch (e: unknown) {
    console.error("API request failed:", e);
    return new ResponseWrapper<T>(
      500,
      null,
      "Network error or server unreachable",
      "Internal Server Error"
    );
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
