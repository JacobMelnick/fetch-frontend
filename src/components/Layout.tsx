import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Head from "next/head";

const Layout = ({ children }) => (
  <div
    style={{
      overflow: "hidden",
      backgroundColor: "lightcyan",
    }}
  >
    <Head>
      <title>White Oak Adoption Center</title>
    </Head>
    <Header />
    <div style={{ paddingTop: 50 }}>{children}</div>
    <Footer />
  </div>
);

export default Layout;
