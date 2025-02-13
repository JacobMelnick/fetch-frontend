import { ApiClient } from "../apiClient/ApiClient";
import { RequestConfig } from "../apiClient/types";
import { Dog } from "../models/Dog";
import {
  LocationResultResponse,
  MatchResultResponse,
  SearchResultResponse,
} from "../response/SearchResultResponse";

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
      return null;
    } catch (error) {
      console.error("Unexpected error in fetchBreeds:", error);
      return null;
    }
  }

  public static async fetchDogIds({
    page,
    breeds,
    zipCodes,
    sortField,
    sortDir,
  }: {
    page: number;
    breeds: string[];
    zipCodes?: string[];
    sortField: "breed" | "age" | "name";
    sortDir: "asc" | "desc";
  }): Promise<SearchResultResponse | null> {
    let url = `${DOG_URL}/search`;

    const from = page ? 25 * (page - 1) : 0;
    url += `?from=${from}&size=25`;

    const params = new URLSearchParams();
    breeds.forEach((breed) => params.append("breeds[]", breed));
    if (zipCodes && zipCodes.length) {
      zipCodes.forEach((zipCode) => params.append("zipCodes[]", zipCode));
    }
    url += `&${params.toString()}`;
    url += `&sort=${sortField}:${sortDir}`;
    const request: RequestConfig<SearchResultResponse> = { path: url };

    try {
      const response = await ApiClient.get(request);
      if (response.isOk && response.data) {
        return response.data;
      }
      console.error("Error fetching dogs:", response.error);
      return null;
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
      return null;
    } catch (error) {
      console.error("Unexpected error in fetchDogs:", error);
      return null;
    }
  }

  public static async fetchDogMatches(
    ids: string[]
  ): Promise<MatchResultResponse[] | null> {
    const url = `${DOG_URL}/match`;
    const request: RequestConfig<MatchResultResponse[], string[]> = {
      path: url,
      body: ids,
    };

    try {
      const response = await ApiClient.post(request);
      if (response.isOk && response.data) {
        return response.data;
      }
      console.error("Error fetching dogs:", response.error);
      return null;
    } catch (error) {
      console.error("Unexpected error in fetchDogs:", error);
      return null;
    }
  }

  public static async fetchDogLocations(
    zipCodes: string[]
  ): Promise<Location[] | null> {
    const request: RequestConfig<Location[], string[]> = {
      path: "/locations",
      body: zipCodes,
    };

    try {
      const response = await ApiClient.post(request);
      if (response.isOk && response.data) {
        return response.data;
      }
      console.error("Error fetching dogs:", response.error);
      return null;
    } catch (error) {
      console.error("Unexpected error in fetchDogs:", error);
      return null;
    }
  }

  public static async fetchDogsByLocation(
    city?: string,
    states?: string[],
    from: number = 0,
    size: number = 25
  ): Promise<LocationResultResponse | null> {
    const url = `/locations/search`;

    type Tbody = {
      from: number;
      size: number;
      city?: string;
      states?: string[];
    };

    const body: Tbody | any = {
      from: from,
      size: size,
    };

    if (city) {
      body.city = city;
    }
    if (states && states.length) {
      body.states = states;
    }

    const request: RequestConfig<LocationResultResponse> = {
      path: url,
      body: body,
    };

    try {
      const response = await ApiClient.post(request);
      if (response.isOk && response.data) {
        return response.data;
      }
      console.error("Error fetching dogs:", response.error);
      return null;
    } catch (error) {
      console.error("Unexpected error in fetchDogs:", error);
      return null;
    }
  }
}
