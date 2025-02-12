import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { DogService } from "@/api/services/DogService";
import { Dog } from "@/api/models/Dog";
import DogCard from "../../components/DogComponents/DogCard";
import { Box, Container, Grid2, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { favoritesAtom } from "@/utils/favoritesAtom";
import { MatchResultResponse } from "@/api/response/SearchResultResponse";

const Favorites = () => {
  const [favoriteIds] = useAtom(favoritesAtom);
  const [favoriteDogs, setFavoriteDogs] = useState<Dog[]>([]);
  const [matchedDogs, setMatchedDogs] = useState<Dog[]>([]);
  const [matchedDogIds, setMatchedDogsIds] = useState<string[]>([]);
  console.log("matchedDogIds:", matchedDogIds);
  const getFavorites = async () => {
    if (favoriteIds.length) {
      const dogResp = await DogService.getsDogsByIds(favoriteIds);
      if (dogResp) {
        setFavoriteDogs(dogResp);
      }
    } else {
      setFavoriteDogs([]);
    }
  };

  const getDogMatches = async () => {
    try {
      await DogService.fetchDogMatches(favoriteIds).then(
        (data) => {
          setMatchedDogsIds(data);
        }
        //   {
        //   favoriteDogs.forEach((favorite) => {
        //     console.log("data:", data);
        //     console.log("favorite:", favorite.id);
        //     if (favorite.id === data.match) {
        //       console.log("data:", data);
        //     }

        // }
      );
    } catch {}
  };

  useEffect(() => {
    getFavorites();
  }, [favoriteIds]);

  return (
    <Layout>
      <Box sx={{ minHeight: "100vh" }}>
        {favoriteDogs.length <= 0 ? (
          <Container maxWidth="sm" sx={{ height: "100%" }}>
            <Box textAlign="center" mt={4}>
              <Typography variant="h5" gutterBottom>
                No Dogs Favorited
              </Typography>
              <Typography variant="body1" paragraph>
                Start searching and add your favorite dogs to see your match!
              </Typography>
            </Box>
          </Container>
        ) : (
          <>
            <Box textAlign="left">
              <Typography variant="h5" gutterBottom>
                Your Favorites
              </Typography>
            </Box>
            <Grid2 direction={"row"} size={4} container spacing={2}>
              {favoriteDogs.map((dog) => (
                <DogCard
                  key={dog.id}
                  breed={dog.breed}
                  imageUrl={dog.img}
                  age={dog.age}
                  id={dog.id}
                  name={dog.name}
                />
              ))}
            </Grid2>
          </>
        )}
        {matchedDogs.length > 0 && (
          <>
            <Box textAlign="left" sx={{ py: 3 }}>
              <Typography variant="h5" gutterBottom>
                Our Matches
              </Typography>
            </Box>
            <Grid2 direction={"row"} size={4} container spacing={2}>
              {matchedDogs.map((dog) => (
                <DogCard
                  key={dog.id}
                  breed={dog.breed}
                  imageUrl={dog.img}
                  age={dog.age}
                  id={dog.id}
                  name={dog.name}
                />
              ))}
            </Grid2>
          </>
        )}
      </Box>
    </Layout>
  );
};

export default Favorites;
