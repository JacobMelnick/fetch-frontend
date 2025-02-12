import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import {
  Button,
  Box,
  Typography,
  Paper,
  Modal,
  Container,
} from "@mui/material";
import { favoritesAtom } from "@/utils/favoritesAtom";
import { useAtom } from "jotai";
import { DogService } from "@/api/services/DogService";
import { Dog } from "@/api/models/Dog";
import DogCard from "../DogComponents/DogCard";

const DogMatcher = () => {
  const [favorites] = useAtom(favoritesAtom);
  const [foundMatch, setFoundMatch] = useState(false);
  const [rolling, setRolling] = useState(true);
  const [open, setOpen] = useState(false);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [currentDog, setCurrentDog] = useState<Dog | null>(null);

  const fetchDogs = async () => {
    if (favorites.length) {
      const response = await DogService.getsDogsByIds(favorites);
      if (response) setDogs(response);
    }
  };

  useEffect(() => {
    fetchDogs();
  }, [favorites]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (rolling) {
      interval = setInterval(() => {
        setCurrentDog(dogs[Math.floor(Math.random() * dogs.length)]);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [rolling, dogs]);

  useEffect(() => {
    if (!open) {
      setCurrentDog(null);
      setFoundMatch(false);
    }
  }, [open]);

  const findMatch = () => {
    setOpen(true);
    if (dogs.length) {
      setRolling(true);
      setTimeout(() => {
        setRolling(false);
        const match = dogs[Math.floor(Math.random() * dogs.length)];
        setCurrentDog(match);
        setFoundMatch(true);
      }, 2000);
    }
  };

  return (
    <Box>
      <Button variant="contained" color="primary" onClick={findMatch}>
        Find Match
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <>
          {foundMatch && <Confetti numberOfPieces={200} />}
          <Box
            component="div"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            position="absolute"
            top="50%"
            left="50%"
            sx={{ transform: "translate(-50%, -50%)" }}
            bgcolor="background.paper"
            boxShadow={24}
            p={4}
            borderRadius={2}
          >
            <Paper
              elevation={3}
              sx={{ padding: 4, borderRadius: 2, textAlign: "center" }}
            >
              {!favorites.length ? (
                <Container maxWidth="sm" sx={{ height: "100%" }}>
                  <Box textAlign="center" mt={4}>
                    <Typography variant="h5" gutterBottom>
                      No Dogs Favorited
                    </Typography>
                    <Typography variant="body1" paragraph>
                      Start searching and add your favorite dogs to see your
                      match!
                    </Typography>
                  </Box>
                </Container>
              ) : (
                <motion.div
                  animate={{ scale: rolling ? [1, 1.1, 1] : 1 }}
                  transition={{ repeat: rolling ? Infinity : 0, duration: 0.3 }}
                >
                  {currentDog ? (
                    <DogCard
                      key={currentDog.id}
                      id={currentDog.id}
                      breed={currentDog.breed}
                      imageUrl={currentDog.img}
                      name={currentDog.name}
                      age={currentDog.age}
                    />
                  ) : (
                    <Typography variant="h4" fontWeight="bold">
                      Searching...
                    </Typography>
                  )}
                </motion.div>
              )}
            </Paper>
            {foundMatch && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="mt-6"
              >
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  color="success.main"
                  mt={2}
                >
                  🎉 You&apos;ve Been Matched! 🎉
                </Typography>
              </motion.div>
            )}
          </Box>
        </>
      </Modal>
    </Box>
  );
};

export default DogMatcher;
