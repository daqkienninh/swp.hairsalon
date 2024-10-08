import { useState } from "react";
import React from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import HomePage from "./pages/homepage";
import ManageService from "./pages/staff/manage-service";
import Dashboard from "./components/dashboard";
import Layout from "./components/layout";
import Test from "./pages/test";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function App() {
  const ProtectRouteAuth = ({ children }) => {
    const user = useSelector((store) => store.user);
    console.log(user);
    if (user && user?.role === "CUSTOMER") { //Customize the role
      return children;
    }
    toast.error("Not allow")
    return <Navigate to={"/login"} />
  }

  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout/>,
      children: [
        {
          path: "",
          element: <HomePage/>
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
      path: "dashboard",
      element: (
        <ProtectRouteAuth>
          <Dashboard />
        </ProtectRouteAuth>
      ),
      children: [
        {
          path: "service",
          element: <ManageService />
        },
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