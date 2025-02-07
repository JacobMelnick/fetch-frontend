import React from "react";
import { Box, Container, Typography, Link } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.main",
        color: "white",
        textAlign: "center",
        mt: "auto",
        py: 3,
      }}
    >
      <Container>
        <Typography variant="body1">
          © {new Date().getFullYear()} Tres Comas. All rights reserved.
        </Typography>
        <Typography variant="body2">
          <Link color="inherit" sx={{ mx: 1 }}>
            Privacy Policy
          </Link>
          <Link color="inherit" sx={{ mx: 1 }}>
            Terms of Service
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
