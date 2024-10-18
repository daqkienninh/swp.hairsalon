import React, { useRef } from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/headertop";
import Footer from "../footer";

function Layout() {
  const footerRef = useRef(null);

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Header scrollToFooter={scrollToFooter} />
      <div
        className="main-content"
        style={{
          padding: 0,
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </div>
      <Footer ref={footerRef} />
      {/* <FooterBottom /> */}
    </div>
  );
}

export default Layout;
