import { useState, useEffect, SetStateAction, Dispatch } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { DogService } from "@/api/services/DogService";
import { Typography } from "@mui/material";

interface BreedsAutocompleteProps {
  setSelectedBreedFilters: Dispatch<SetStateAction<string[]>>;
}
const BreedsAutocomplete = ({
  setSelectedBreedFilters,
}: BreedsAutocompleteProps) => {
  const [breedsList, setBreedsList] = useState<string[]>([]);
  const getBreeds = async () => {
    try {
      const breeds = await DogService.fetchBreeds();
      if (breeds) setBreedsList(breeds);
    } catch {
      setBreedsList([]);
    }
  };

  useEffect(() => {
    getBreeds();
  }, []);
  return (
    <Stack spacing={3} sx={{ width: 500 }}>
      <Typography variant="h5">Filter By Breed</Typography>

      <Autocomplete
        multiple
        id="breeds-list"
        options={breedsList}
        onChange={(e, newValues) => {
          setSelectedBreedFilters(newValues);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Breeds"
            placeholder="Select your favorite breeds"
          />
        )}
      />
    </Stack>
  );
};

export default BreedsAutocomplete;
