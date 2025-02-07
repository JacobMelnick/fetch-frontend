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
} from "@mui/material";
import { FavoriteBorder, Favorite } from "@mui/icons-material";

interface DogCardProps {
  breed: string;
  imageUrl: string;
  description: string;
}

const DogCard: React.FC<DogCardProps> = ({ breed, imageUrl, description }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite); //this needs to be saved
  };

  return (
    <>
      <Card sx={{ maxWidth: 345, cursor: "pointer" }} onClick={handleOpen}>
        <CardMedia component="img" height="140" image={imageUrl} alt={breed} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {breed}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <IconButton onClick={handleFavoriteToggle}>
            {isFavorite ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose} fullScreen>
        <DialogTitle>`Check out this ${breed}`</DialogTitle>
        <DialogContent>
          <Typography variant="body1">This is the Dog Modal</Typography>
          {isFavorite && <Favorite fontSize="small" />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DogCard;
