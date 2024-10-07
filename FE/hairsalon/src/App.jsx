import { useState } from "react";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import HomePage from "./pages/homepage";
import ManageService from "./pages/staff/manage-service";
import Dashboard from "./components/dashboard";
import Layout from "./components/layout";
import Test from "./pages/test";

function App() {
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
      element: <Dashboard />,
      children: [
        {
          path: "service",
          element: <ManageService />
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
