import Footer from "./Footer/Footer";
import Header from "./Header/Header";

const Layout = ({ children }) => (
  <div style={{ overflow: "hidden" }}>
    <Header />
    <div style={{ paddingTop: 150 }}>{children}</div>
    <Footer />
  </div>
);

export default Layout;
