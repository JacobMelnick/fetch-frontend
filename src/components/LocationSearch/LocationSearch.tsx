import { DogService } from "@/api/services/DogService";
import { dogZipCodesAtom } from "@/utils/dogZipCodesAtom";
import { states } from "@/utils/stateObject";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useAtom } from "jotai";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import React, { useState } from "react";

const LocationSearch: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [alertFlag, setAlertFlag] = useState<boolean>(false);
  const [, setDogZipCodes] = useAtom(dogZipCodesAtom);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);

  const handleSearch = async () => {
    await DogService.fetchDogsByLocation(city, selectedStates).then((data) => {
      if (data && data.results.length) {
        const dogZips = data.results.map((dog) => dog.zip_code);
        setDogZipCodes(dogZips);
        setAlertFlag(false);
      } else {
        setAlertFlag(true);
      }
    });
  };

  const handleReset = () => {
    setCity("");
    setSelectedStates([]);
    setAlertFlag(false);
    setDogZipCodes([]);
  };

  return (
    <Stack spacing={2} p={2}>
      <Typography variant="h5" align="center">
        Search Your Area
      </Typography>
      <TextField
        label="City"
        variant="outlined"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        fullWidth
      />
      <Autocomplete
        multiple
        options={states}
        value={selectedStates}
        getOptionLabel={(option) => option.label}
        renderTags={(value, getProps) =>
          value.map((option, index) => (
            <Chip
              label={option.code}
              {...getProps({ index })}
              key={option.code}
            />
          ))
        }
        onChange={(event, newState) => setSelectedStates(newState)}
        renderInput={(params) => (
          <TextField {...params} label="Select States" variant="outlined" />
        )}
      />
      <Stack direction="row">
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          fullWidth
          disabled={!city && selectedStates.length === 0}
        >
          Search
        </Button>
        <IconButton onClick={handleReset}>
          <RestartAltIcon />
        </IconButton>
      </Stack>
      <Box
        position="fixed"
        bottom={20}
        left="50%"
        style={{ transform: "translateX(-50%)" }}
      >
        {alertFlag && (
          <Alert severity="error" onClose={() => setAlertFlag(false)}>
            No results found, please specify your search
          </Alert>
        )}
      </Box>
    </Stack>
  );
};

export default LocationSearch;
