import React, { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/headertop";
import Footer from "../footer";
import api from "./../../config/axios";
import { useParams } from "react-router-dom";

function Layout() {
  const footerRef = useRef(null);
  const [customer, setCustomer] = useState(null);
  const { id: customerId } = useParams();
  
  useEffect(() => {
    const fetchCustomer = async () => {
      if (customerId) {
        try {
          const response = await api.get(`/api/customer/${customerId}`);
          setCustomer(response.data);
        } catch (error) {
          console.error("Error fetching customer:", error);
        }
      }
    };

    fetchCustomer();
  }, [customerId]);

  return (
    <div>
      <Header customer={customer} /> {/* Pass customer as a prop */}
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
