import AppWrapper from "./AppWrapper";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Head from "next/head";
type LayoutProps = {
  children: React.ReactNode;
};
const Layout: React.FC<LayoutProps> = ({ children }) => (
  <AppWrapper>
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
  </AppWrapper>
);

export default Layout;
