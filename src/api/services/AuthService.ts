import { ApiClient } from "../apiClient/ApiClient";
import { RequestConfig } from "../apiClient/types";
import { LoginRequest } from "../request/LoginRequest";

const AUTH_URL = "/auth";
export class AuthService {
  public static async login(body: LoginRequest) {
    const url = `${AUTH_URL}/login`;
    const request: RequestConfig<string, LoginRequest> = {
      path: url,
      body,
    };

    const response = await ApiClient.post(request);
    console.log("loging");
    if (response.isOk) {
      return console.log(response);
    }
    throw new Error("Login Failed");
  }

  public static async logout() {
    const url = `${AUTH_URL}/logout`;
    const request: RequestConfig<string> = {
      path: url,
    };

    const response = await ApiClient.post(request);
    if (response.isOk && !!response.data) {
      return response.data;
    }
    throw new Error("Failed to logout");
  }
}
