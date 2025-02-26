import { useEffect } from "react";
import Layout from "../../components/Layout";
import { DogService } from "@/api/services/DogService";
import DogCard from "../../components/DogComponents/DogCard";
import { Box, Container, Grid2, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { favoriteDogsAtom, favoritesAtom } from "@/utils/favoritesAtom";

const Favorites = () => {
  const [favoriteIds] = useAtom(favoritesAtom);
  const [favoriteDogs, setFavoriteDogs] = useAtom(favoriteDogsAtom);
  const getFavorites = async () => {
    if (favoriteIds.length) {
      const dogResp = await DogService.getsDogsByIds(favoriteIds);
      if (dogResp) {
        const dogZips = dogResp.map((dog) => dog.zip_code);
        const dogLocations = await DogService.fetchDogLocations(dogZips);
        if (dogLocations)
          setFavoriteDogs(() => {
            return dogResp.map((dog, index) => ({
              ...dog,
              location: dogLocations[index],
            })) as any;
          });
      }
    } else {
      setFavoriteDogs([]);
    }
  };

  useEffect(() => {
    if (favoriteIds.length !== favoriteDogs.length) {
      getFavorites();
    }
  }, [favoriteIds]);

  return (
    <Layout>
      <Box sx={{ minHeight: "100vh", p: 2 }}>
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
                  location={dog.location}
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
