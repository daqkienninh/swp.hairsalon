import { useState } from "react";
import React from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import HomePage from "./pages/homepage";
import ManageService from "./pages/staff/manage-service";
import Layout from "./components/layout";
import Test from "./pages/test";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ManageStylist from "./pages/admin/manage-stylist";
import DashboardAdmin from "./components/dashboard-admin";
import DashboardStaff from "./components/dashboard-staff";
import ManageAppointment from "./pages/staff/manage-appointment";
import ManageCustomer from "./pages/admin/manage-customer";

function App() {
  const ProtectRouteAuth = ({ children, allowedRoles }) => {
    const user = useSelector((store) => store.user);
    console.log(user);
    if (user && allowedRoles.includes(user.role)) { //Customize the role
      return children;
    }
    toast.error("Not allow")
    return <Navigate to={"/login"} />
  }

  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <HomePage />
        }
      ]

    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "register",
      element: <RegisterPage />,
    },
    {
      path: "staff",
      element: (
        <ProtectRouteAuth allowedRoles={["STAFF"]}>
          <DashboardStaff />
        </ProtectRouteAuth>
      ),
      children: [
        {
          path: "service",
          element: <ManageService />
        },
        {
          path: "appointment",
          element: <ManageAppointment />
        }
      ]
    },
    {
      path: "admin",
      element: (
        <ProtectRouteAuth allowedRoles={["ADMIN"]}>
          <DashboardAdmin />
        </ProtectRouteAuth>
      ),
      children: [
        {
          path: "stylist",
          element: <ManageStylist />
        },
        {
          path: "customer",
          element: <ManageCustomer />
        }
      ]
    },
    {
      path: "test",
      element: <Test />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;