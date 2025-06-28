import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import ScrollToTop from "../../Utils/ScrollToTop/ScrollToTop";


const Layout = () => {
  return (
    <>
      <div className="f-inter">
        <ScrollToTop/>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default Layout;
