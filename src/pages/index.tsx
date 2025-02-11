import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import {
  Typography,
  CircularProgress,
  Grid2,
  Box,
  Pagination,
  Button,
} from "@mui/material";
import DogCard from "./components/DogComponents/DogCard";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { DogService } from "@/api/services/DogService";
import { Dog } from "@/api/models/Dog";
import BreedsAutocomplete from "./components/BreedsAutocomplete/BreedsAutocomplete";

const HomePage: React.FC = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authorized, setAuthorized] = useState(false);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [breedsFilter, setBreedsFilter] = useState<string[]>(["Chihuahua"]);
  const [sortField, setSortField] = useState<"name" | "breed" | "age">("name");
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
      console.log("fetch dog resp", dogIdsResponse);

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
  }, [page]);

  // if (loading) {
  //   return (
  //     <Layout>
  //       <CircularProgress />
  //       <Typography>Loading dogs...</Typography>
  //     </Layout>
  //   );
  // }

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
        <Typography variant="h1" component="h1" gutterBottom>
          Find your new best friend!
        </Typography>
        <Typography>Get started</Typography>
        {/* Render dog cards */}
        <BreedsAutocomplete />
        {/*Sort Buttons*/}
        <Box>
          <Button onClick={() => handleSort("name")}>Sort by Name</Button>
          <Button onClick={() => handleSort("breed")}>Sort by Breed</Button>
          <Button onClick={() => handleSort("age")}>Sort by Age</Button>
        </Box>
        <Grid2 direction={"row"} size={4} container spacing={2}>
          {loading ? (
            <>
              <CircularProgress />
              <Typography>Loading dogs...</Typography>
            </>
          ) : (
            sortedDogs.map((dog) => (
              <DogCard
                key={dog.id}
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
