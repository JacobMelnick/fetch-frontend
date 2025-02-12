import { atomWithStorage } from "jotai/utils";

export const favoritesAtom = atomWithStorage<string[]>("favorites", []);
