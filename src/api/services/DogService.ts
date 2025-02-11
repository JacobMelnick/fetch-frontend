import { ApiClient } from "../apiClient/ApiClient";
import { RequestConfig } from "../apiClient/types";
import { Dog } from "../models/Dog";
import { SearchResultResponse } from "../response/SearchResultResponse";

const DOG_URL = "/dogs";

export class DogService {
  public static async fetchBreeds(): Promise<string[] | null> {
    const url = `${DOG_URL}/breeds`;
    const request: RequestConfig<string[]> = { path: url };

    try {
      const response = await ApiClient.get(request);
      if (response.isOk && response.data) {
        return response.data;
      }
      console.error("Error fetching breeds:", response.error);
      return null; // Return null instead of throwing an error
    } catch (error) {
      console.error("Unexpected error in fetchBreeds:", error);
      return null;
    }
  }

  public static async fetchDogIds({
    page,
    breeds,
    sortField,
    sortDir,
  }: {
    page: number;
    breeds: string[];
    sortField: "breed" | "age" | "name";
    sortDir: "asc" | "desc";
  }): Promise<SearchResultResponse | null> {
    let url = `${DOG_URL}/search`;

    const from = page ? 25 * (page - 1) : 0;
    url += `?from=${from}&size=25`;

    const params = new URLSearchParams();
    breeds.forEach((breed) => params.append("breeds[]", breed));
    url += `&${params.toString()}`;
    url += `&sort=${sortField}:${sortDir}`;
    const request: RequestConfig<SearchResultResponse> = { path: url };

    try {
      const response = await ApiClient.get(request);
      if (response.isOk && response.data) {
        return response.data;
      }
      console.error("Error fetching dogs:", response.error);
      return null; // Return null instead of throwing an error
    } catch (error) {
      console.error("Unexpected error in fetchDogs:", error);
      return null;
    }
  }
  public static async getsDogsByIds(ids: string[]): Promise<Dog[] | null> {
    const url = `${DOG_URL}`;
    const request: RequestConfig<Dog[], string[]> = { path: url, body: ids };

    try {
      const response = await ApiClient.post(request);
      if (response.isOk && response.data) {
        return response.data;
      }
      console.error("Error fetching dogs:", response.error);
      return null; // Return null instead of throwing an error
    } catch (error) {
      console.error("Unexpected error in fetchDogs:", error);
      return null;
    }
  }
}
