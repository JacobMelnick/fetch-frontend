import React from "react";
import {
  Dialog,
  Button,
  DialogContent,
  Typography,
  Box,
  CardMedia,
  Card,
  CardContent,
  IconButton,
  DialogActions,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

interface SimpleDialogProps {
  open: boolean;
  handleClose: () => void;
  imageUrl: string;
  breed: string;
  name: string;
  isFavorite: boolean;
  age: number;
}

const DogModal: React.FC<SimpleDialogProps> = ({
  open,
  handleClose,
  imageUrl,
  breed,
  name,
  isFavorite,
  age,
}: SimpleDialogProps) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Card sx={{ minWidth: 345, cursor: "pointer" }}>
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
                <IconButton>
                  {isFavorite ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DogModal;
