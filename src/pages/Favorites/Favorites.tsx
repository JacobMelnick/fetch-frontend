import React from "react";
import Layout from "../components/Layout";

type FavoritesProps = {
  dog?: string;
};

const Favorites: React.FC<FavoritesProps> = () => (
  <Layout>
    <h3>Favorites</h3>
  </Layout>
);

export default Favorites;
