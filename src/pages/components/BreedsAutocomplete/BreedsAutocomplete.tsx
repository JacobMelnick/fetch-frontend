import { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { DogService } from "@/api/services/DogService";

const BreedsAutocomplete = () => {
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
      <Autocomplete
        multiple
        id="breeds-list"
        options={breedsList}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Breeds"
            placeholder="Favorites"
          />
        )}
      />
    </Stack>
  );
};

export default BreedsAutocomplete;
