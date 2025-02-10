import React from "react";
import { AppBar, Button, Box, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "rgb(108 217 211)",
        borderRadius: "12px",
        margin: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Image
            src="/HeaderPage.jpg"
            alt="Logo"
            width={140}
            height={100}
            layout="intrinsic"
          />
        </Box>
        <Typography
          variant="h5"
          color="textPrimary"
          sx={{ flexGrow: 1, marginLeft: 2, fontFamily: "monospace" }}
        >
          White Oak Adoption Center
        </Typography>
        <Box>
          <Button color="inherit">
            <Link href="/" passHref>
              <Typography>Home</Typography>
            </Link>
          </Button>
          <Button color="inherit">
            <Link href="/favorites" passHref>
              <Typography>Favorites</Typography>
            </Link>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
