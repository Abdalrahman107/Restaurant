import React from "react";
import AuthNavbar from "./AuthNavbar";
import { Outlet } from "react-router-dom";
import Footer from "../../User/Footer/Footer";
const AuthLayout = () => {
  return (
      <div>
        <AuthNavbar />
        <Outlet />
        <Footer />
      </div>
  );
};

export default AuthLayout;
