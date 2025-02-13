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
  DialogActions,
} from "@mui/material";
import { Location } from "@/api/models/Location";

interface DogModalProps {
  open: boolean;
  handleClose: () => void;
  imageUrl: string;
  breed: string;
  name: string;
  isFavorite: boolean;
  age: number;
  location: Location;
}

const DogModal: React.FC<DogModalProps> = ({
  open,
  handleClose,
  imageUrl,
  breed,
  name,
  age,
  location,
}: DogModalProps) => {
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
              {location && (
                <Typography>
                  Location: {location.city} {location.state},{location.zip_code}
                </Typography>
              )}
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
