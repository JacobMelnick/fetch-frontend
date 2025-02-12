import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  Typography,
  Grid2,
  Box,
  Pagination,
  Button,
  Stack,
} from "@mui/material";
import DogCard from "../components/DogComponents/DogCard";
import { DogService } from "@/api/services/DogService";
import { Dog } from "@/api/models/Dog";
import BreedsAutocomplete from "../components/BreedsAutocomplete/BreedsAutocomplete";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DogCardLoadingSkeleton from "@/components/DogComponents/DogCardLoadingSkeleton";

const HomePage: React.FC = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [breedsFilter, setBreedsFilter] = useState<string[]>([]);
  const [sortField, setSortField] = useState<"name" | "breed" | "age">("breed");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const getDogs = async () => {
    setLoading(true);
    try {
      const dogIdsResponse = await DogService.fetchDogIds({
        page,
        breeds: breedsFilter,
        sortField,
        sortDir: sortOrder,
      });
      setAuthorized(true);

      if (dogIdsResponse?.resultIds) {
        const dogData = await DogService.getsDogsByIds(
          dogIdsResponse.resultIds
        );

        setTotal(dogIdsResponse.total);
        if (dogData) {
          setDogs(dogData);
        } else {
          setError("Failed to fetch dogs.");
        }
      }
    } catch {
      setError("An error occurred while fetching dogs.");
      setAuthorized(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDogs();
  }, [page, breedsFilter, sortField, sortOrder]);

  if (error) {
    return (
      <Layout>
        <Typography color="error">{error}</Typography>
      </Layout>
    );
  }

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleSort = (field: "name" | "breed" | "age") => {
    setSortOrder(sortField === field && sortOrder === "asc" ? "desc" : "asc");
    setSortField(field);
  };

  const sortedDogs = [...dogs].sort(
    (a, b) =>
      (a[sortField] > b[sortField] ? 1 : -1) * (sortOrder === "asc" ? 1 : -1)
  );

  return (
    authorized && (
      <Layout>
        <Box sx={{ p: 2 }}>
          <Stack alignItems="center">
            <Typography variant="h5">Filter By Breed</Typography>
            <BreedsAutocomplete setSelectedBreedFilters={setBreedsFilter} />
          </Stack>
          <Stack
            alignItems="center"
            my={2}
            direction="row"
            justifyContent="center"
          >
            {["breed", "age", "name"].map((field) => (
              <Button
                key={field}
                sx={{ borderRadius: 2 }}
                onClick={() => handleSort(field as "name" | "breed" | "age")}
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}{" "}
                {sortField === field ? (
                  sortOrder === "asc" ? (
                    <ArrowDropUpIcon fontSize="small" />
                  ) : (
                    <ArrowDropDownIcon fontSize="small" />
                  )
                ) : (
                  ""
                )}
              </Button>
            ))}
          </Stack>
          <Grid2
            direction={"row"}
            size={4}
            container
            spacing={2}
            justifyContent="center"
          >
            {loading ? (
              <Grid2 direction={"row"} size={12} container spacing={2}>
                <DogCardLoadingSkeleton />
              </Grid2>
            ) : (
              sortedDogs.map((dog) => (
                <DogCard
                  key={dog.id}
                  id={dog.id}
                  breed={dog.breed}
                  imageUrl={dog.img}
                  name={dog.name}
                  age={dog.age}
                />
              ))
            )}
          </Grid2>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              my: 2,
            }}
          >
            <Pagination
              count={Math.round(total / 25)}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </Box>
      </Layout>
    )
  );
};

export default HomePage;

// // ✅ This function must be **outside** the component
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const session = await getSession(context);
//   console.log(session);

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }

//   return { props: {} };
// };
