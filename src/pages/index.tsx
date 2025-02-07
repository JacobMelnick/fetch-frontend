import { useEffect } from "react";
import Layout from "./components/Layout";
import { AuthService } from "@/api/services/AuthService";
import { Typography } from "@mui/material";
import DogCard from "./components/DogComponents/DogCard";

const HomePage: React.FC = () => {
  async function login() {
    const response = await AuthService.login({
      name: "Jack",
      email: "jack@test.com",
    });

    console.log("response:", response);
  }
  useEffect(() => {
    login();
  }, []);
  return (
    <Layout>
      <Typography variant="h1" component="h1" gutterBottom>
        Favorite a New Best Friend
      </Typography>
      <Typography variant="h5" gutterBottom>
        We have many doggos waiting for a developer to code them in.
      </Typography>
      <Typography>find some dogs here look at this list such wow</Typography>
      {/* map over dog info */}
      <DogCard breed={"dog"} imageUrl={"11"} description={"big dog"} />
    </Layout>
  );
};

export default HomePage;
