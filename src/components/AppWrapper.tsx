import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, CircularProgress, Typography } from "@mui/material";
import { DogService } from "@/api/services/DogService";
import { useAtom } from "jotai";
import { authAtom } from "@/utils/authAtom";

const AppWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authorized, setAuthorized] = useAtom(authAtom);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const response = await DogService.fetchBreeds();
      if (!response) {
        setError("error");
        router.push("/Login/login");
        setAuthorized(false);
      } else {
        setError("");
        setAuthorized(true);
      }
      setLoading(false);
    };

    checkSession();
  }, []);

  if (!authorized && loading) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return !error && <Box>{children}</Box>;
};

export default AppWrapper;
