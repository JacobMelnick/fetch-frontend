import { Location } from "@/api/models/Location";

export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
  location: Location;
}
