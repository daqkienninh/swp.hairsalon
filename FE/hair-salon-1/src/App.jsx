import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
/***************************IMPORT PAGE******************************/
import Layout from "./components/layout";
import HomePage from "./pages/homepage";
import Booking from "./pages/book";
import ServicePage from "./pages/services";
import ConfirmBooking from "./pages/confirmbook";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ManageService from "./pages/staff/manage-service";
import ManageAppointment from "./pages/staff/manage-appointment";
import DashboardAdmin from "./components/dashboard-admin";
import ManageStylist from "./pages/admin/manage-stylist";
import ManageCustomer from "./pages/admin/manage-customer";
import ViewCustomer from "./pages/profile/customer/view";
import DashboardStaff from "./components/dashboard-staff";
import ManageStaff from "./pages/admin/manage-staff";
import ManageManager from "./pages/admin/manage-manager";
import DashboardLayout from "./components/layout/dashboardlayout";
import Payment from "./pages/profile/customer/payment";
import SuccessPage from "./pages/profile/customer/success";

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
          element: <HomePage />,
        },
        {
          path: "services",
          element: <ServicePage />,
        },
        {
          path: "booking",
          element: <Booking />,
        },
        {
          path: "confirm-booking",
          element: <ConfirmBooking />,
        },
      ],
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
          path: "",
          element: <DashboardLayout/>
        },
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
        <ProtectRouteAuth allowedRoles={["ADMINISTRATOR"]}>
          <DashboardAdmin />
        </ProtectRouteAuth>
      ),
      children: [
        {
          path: "managestylist",
          element: <ManageStylist />
        },
        {
          path: "managecustomer",
          element: <ManageCustomer />
        },
        {
          path: "managestaff",
          element: <ManageStaff />
        }, {
          path: "managemanager",
          element: <ManageManager />
        }
      ]
    },
    {
      path: "customer",
      element: <ViewCustomer />,
    },
    {
      path: "success",
      element: <SuccessPage />,
    },
    {
      path: "test",
      element: <Payment />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
