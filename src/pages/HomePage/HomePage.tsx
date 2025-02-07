import Image from "next/image";
import styles from "./page.module.css";
import Layout from "../components/Layout";

interface Props {
  test: string;
}

const HomePage: React.FC<Props> = (props) => {
  return (
    <Layout>
      <HomePage test={""} />
    </Layout>
  );
};

export default HomePage;
