import { Grid2, Skeleton } from "@mui/material";
import React from "react";

const DogCardLoadingSkeleton: React.FC = () => (
  <>
    {Array.from({ length: 24 }).map((_, index) => (
      <Grid2 key={index} size={2}>
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={200}
          sx={{ borderRadius: "8px" }}
        />
      </Grid2>
    ))}
  </>
);

export default DogCardLoadingSkeleton;
