import { ApiClient } from "../apiClient/ApiClient";
import { RequestConfig } from "../apiClient/types";
import { Dog } from "../models/Dog";

const DOG_URL = "/dogs";
export class DogService {
  public static async fetchBreeds() {
    const url = `${DOG_URL}/breeds`;
    const request: RequestConfig<string[]> = {
      path: url,
    };

    const response = await ApiClient.get(request);
    if (response.isOk && !!response.data) {
      return response.data;
    }
    throw new Error("Failed to retrieve breeds");
  }

  public static async fetchDogs(ids: string[]) {
    const url = `${DOG_URL}/search`;
    const request: RequestConfig<Dog[], string[]> = {
      path: url,
      body: ids,
    };

    const response = await ApiClient.post(request);
    if (response.isOk && !!response.data) {
      return response.data;
    }
    throw new Error("Failed to retrieve breeds");
  }
}
