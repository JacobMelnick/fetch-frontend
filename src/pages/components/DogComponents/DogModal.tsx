import React, { useState } from "react";
import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  Typography,
} from "@mui/material";
import { Favorite } from "@mui/icons-material";

interface SimpleDialogProps {
  breed: string;
  color: string;
  favorite: boolean;
}

const DogModal: React.FC<SimpleDialogProps> = ({
  breed,
  color,
  favorite,
}: SimpleDialogProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Open Dog Modal
      </Button>
      <Dialog open={open} onClose={handleClose} fullScreen>
        <DialogTitle>
          `Check out this ${color} ${breed}`
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">This is the Dog Modal</Typography>
          {favorite && <Favorite fontSize="small" />}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DogModal;
