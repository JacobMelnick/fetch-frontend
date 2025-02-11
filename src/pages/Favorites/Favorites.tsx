import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { DogService } from "@/api/services/DogService";
import { Dog } from "@/api/models/Dog";
import DogCard from "../components/DogComponents/DogCard";
import { Grid2 } from "@mui/material";
import { useAtom } from "jotai";
import { favoritesAtom } from "@/utils/favoritesAtom";

const Favorites = () => {
  const [favoriteIds] = useAtom(favoritesAtom);
  const [favoriteDogs, setFavoriteDogs] = useState<Dog[]>([]);
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

  useEffect(() => {
    getFavorites();
  }, [favoriteIds]);

  return (
    <Layout>
      <h3>Favorites</h3>
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
    </Layout>
  );
};

export default Favorites;
