import React from "react";
import Header from "../header";
import { Link, Outlet } from "react-router-dom";
import Footer from "../footer";
import RegisterPage from "./../../pages/register/index";

function Layout() {
  return (
    <div>
      <Header />
      <div
        className="main-content"
        style={{
          padding: 20,
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
