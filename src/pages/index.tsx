import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import { Typography, CircularProgress } from "@mui/material";
import DogCard from "./components/DogComponents/DogCard";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { DogService } from "@/api/services/DogService";
import { Dog } from "@/api/models/Dog";

const HomePage: React.FC = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authorized, setAuthorized] = useState(false);

  const getDogs = async () => {
    setLoading(true);
    try {
      const dogIdsResponse = await DogService.fetchDogIds();
      setAuthorized(true);
      console.log("fetch dog resp", dogIdsResponse);

      if (dogIdsResponse?.resultIds) {
        const dogData = await DogService.getsDogsByIds(
          dogIdsResponse.resultIds
        );
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
  }, []);

  if (loading) {
    return (
      <Layout>
        <CircularProgress />
        <Typography>Loading dogs...</Typography>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Typography color="error">{error}</Typography>
      </Layout>
    );
  }

  return (
    !loading &&
    authorized && (
      <Layout>
        <Typography variant="h1" component="h1" gutterBottom>
          Favorite a New Best Friend
        </Typography>
        <Typography variant="h5" gutterBottom>
          We have many doggos waiting for a developer to code them in.
        </Typography>
        <Typography>
          Find some dogs here, look at this list—such wow!
        </Typography>
        {/* Render dog cards */}
        {dogs.map((dog) => (
          <DogCard
            key={dog.id}
            breed={dog.breed}
            imageUrl={dog.img}
            description={dog.name}
          />
        ))}
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
