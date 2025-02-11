import React, { useState } from "react";
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

interface DogCardProps {
  breed: string;
  imageUrl: string;
  name: string;
  age: number;
}

const DogCard: React.FC<DogCardProps> = ({ breed, imageUrl, name, age }) => {
  console.log(age);
  const [isFavorite, setIsFavorite] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite); //this needs to be saved
  };

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
            <IconButton onClick={handleFavoriteToggle}>
              {isFavorite ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
          </Box>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose} fullScreen>
        <DialogContent>
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
                <IconButton onClick={handleFavoriteToggle}>
                  {isFavorite ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            X
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DogCard;
