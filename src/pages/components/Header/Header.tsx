import React from "react";
import { Grid2, Stack } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <Grid2
      container
      direction="column"
      alignItems="center"
      size={12}
      sx={{
        top: 0,
        zIndex: 1,
        paddingBottom: "2%",
        boxShadow: "0 1px 0 rgb(0 0 0 / 10%)",
      }}
    >
      <Grid2 size={12}>
        <Image
          src="/HeaderPage.jpg"
          height={400}
          width={2000}
          alt="Melnick and Sons"
        />
      </Grid2>
      <Stack direction="row">
        <Link color="inherit" href={"/"}>
          Home
        </Link>
        <Link color="inherit" href={"./Favorites"}>
          Favorites
        </Link>
      </Stack>
    </Grid2>
  );
};

export default Header;
