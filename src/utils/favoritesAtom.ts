import { Dog } from "@/api/models/Dog";
import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";

export const favoritesAtom = atomWithStorage<string[]>("favorites", []);

export const favoriteDogsAtom = atom<Dog[]>([]);
