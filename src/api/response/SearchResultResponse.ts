import { Location } from "../models/Location";

export interface SearchResultResponse {
  resultIds: [];
  next: string;
  total: number;
}

export interface MatchResultResponse {
  match: "";
}

export interface LocationResultResponse {
  results: Location[];
  total: number;
}
