import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import { useAtom } from "jotai";
import { favoritesAtom } from "@/utils/favoritesAtom";
import DogModal from "./DogModal";

interface DogCardProps {
  breed: string;
  imageUrl: string;
  name: string;
  age: number;
  id: string;
}

const DogCard: React.FC<DogCardProps> = ({
  breed,
  imageUrl,
  name,
  age,
  id,
}) => {
  console.log(age);
  const [isFavorite, setIsFavorite] = useState(false);
  const [open, setOpen] = useState(false);
  const [favorites, setFavorites] = useAtom(favoritesAtom);
  const isFavorited = favorites.includes(id);
  console.log(favorites);

  const handleToggleFavorite = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (!isFavorited) {
      const newStorageItem = [...favorites, id];
      setFavorites(newStorageItem);
      localStorage.setItem("favorites", JSON.stringify(newStorageItem));
    } else {
      const newStorageItem = favorites.filter(
        (savedId: string) => savedId !== id
      );
      setFavorites(newStorageItem);
      localStorage.setItem("favorites", JSON.stringify(newStorageItem));
    }
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    if (isFavorited) {
      setIsFavorite(true);
    }
  }, []);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Card sx={{ minWidth: 345, cursor: "pointer" }} onClick={handleOpen}>
        <CardMedia
          sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
          component="img"
          height="200"
          image={imageUrl}
          alt={breed}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {breed}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Name: {name}
          </Typography>
          <Typography>Age: {age}</Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton onClick={(e) => handleToggleFavorite(e)}>
              {isFavorite ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
          </Box>
        </CardContent>
      </Card>
      <DogModal
        open={open}
        handleClose={handleClose}
        imageUrl={imageUrl}
        breed={breed}
        name={name}
        isFavorite={isFavorite}
        age={age}
      />
    </>
  );
};

export default DogCard;
