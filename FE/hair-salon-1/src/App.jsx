import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
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
import Payment from "./pages/profile/customer/payment";
import SuccessPage from "./pages/profile/customer/success";
import Fail from "./pages/profile/customer/fail";
import ManageAccount from "./pages/admin/manage-account";
import HistoryBooking from "./pages/history/index";
import RequireAuth from "./config/auth";
import ServiceDetail from "./pages/servicedetail";
import ViewStaff from "./pages/profile/staff/view";
import ViewAdmin from "./pages/profile/admin/view";
import OverviewStaff from "./components/dashboard-staff/overviewStaff";
import OverviewAdmin from "./components/dashboard-admin/overviewAdmin";

function App() {
  const ProtectRouteAuth = ({ children, allowedRoles }) => {
    const user = useSelector((store) => store.user);
    const token = localStorage.getItem("token");

    // If user is not authenticated
    if (!token) {
      // Save the current path in localStorage to redirect after login
      localStorage.setItem("redirectPath", window.location.pathname);
      toast.error("Vui lòng đăng nhập để tiếp tục!");
      return <Navigate to="/login" />;
    }
    // If the user is authenticated and has the correct role
    if (user && allowedRoles.includes(user.role)) {
      return children;
    }
    return <Navigate to="/" />;
  };

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
          path: "/service-detail/:id",
          element: <ServiceDetail />,
        },
        {
          path: "services",
          element: <ServicePage />,
        },
        {
          path: "booking",
          element: (
            <RequireAuth>
              <Booking />
            </RequireAuth>
          ),
        },
        {
          path: "confirm-booking",
          element: (
            <RequireAuth>
              <ConfirmBooking />
            </RequireAuth>
          ),
        },
        {
          path: "history-booking",
          element: (
            <RequireAuth>
              <HistoryBooking />
            </RequireAuth>
          ),
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
          element: <OverviewStaff />,
        },
        {
          path: "service",
          element: <ManageService />,
        },
        {
          path: "appointment",
          element: <ManageAppointment />,
        },
      ],
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
          path: "",
          element: <OverviewAdmin />,
        },
        {
          path: "managestylist",
          element: <ManageStylist />,
        },
        {
          path: "managecustomer",
          element: <ManageCustomer />,
        },
        {
          path: "managestaff",
          element: <ManageStaff />,
        },
        {
          path: "managemanager",
          element: <ManageManager />,
        },
        {
          path: "manageaccount",
          element: <ManageAccount />,
        },
      ],
    },
    {
      path: "service",
      element: <ManageService />,
    },
    {
      path: "appointment",
      element: <ManageAppointment />,
    },
    {
      path: "customer",
      element: <ViewCustomer />,
    },
    {
      path: "viewstaff",
      element: <ViewStaff />,
    },
    {
      path: "viewadmin",
      element: <ViewAdmin />,
    },
    {
      path: "success",
      element: <SuccessPage />,
    },
    {
      path: "fail",
      element: <Fail />,
    },
    {
      path: "test",
      element: <Payment />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
