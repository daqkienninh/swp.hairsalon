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
import StylistPage from "./pages/stylist";
import DashboardStylist from "./components/dashboard-stylist";
import DashboardManager from "./components/dashboard-manager";
import OverviewManager from "./components/dashboard-manager/overviewManager";
import ViewTransation from "./pages/manager/manager-balance";
import ViewManager from "./pages/profile/manager/view";
import ViewStylist from "./pages/profile/stylist/view";
import ManageReward from "./pages/staff/manage-reward";
import OverviewStylist from "./components/dashboard-stylist/overviewStylist";
import ManageAccount from "./pages/admin/manage-account";
import RequireAuth from "./config/auth";
import ServiceDetail from "./pages/servicedetail";
import OverviewStaff from "./components/dashboard-staff/overviewStaff";
import OverviewAdmin from "./components/dashboard-admin/overviewAdmin";
import ViewCustomer from "./pages/profile/customer/index";
import ViewStaff from "./pages/profile/staff/index";
import ViewAdmin from "./pages/profile/admin/index";
import SuccessPage from "./pages/payment/success";
import Fail from "./pages/payment/fail";
import Payment from "./pages/payment/payment";
import AppointmentHistory from './pages/history/index';
import ResetPassword from './pages/password/index';

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
          path: "confirm-booking/:appointmentId",
          element: (
            <RequireAuth>
              <ConfirmBooking />
            </RequireAuth>
          ),
        },
        {
          path: "/history-booking/:customerId",
          element: <AppointmentHistory />,
        },
      ],
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "reset-password",
      element: <ResetPassword />,
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
        {
          path: "reward",
          element: <ManageReward />,
        },
      ],
    },
    {
      path: "stylist",
      element: (
        <ProtectRouteAuth allowedRoles={["STYLIST"]}>
          <DashboardStylist/>
        </ProtectRouteAuth>
      ),
      children: [
        {
          path: "",
          element: <OverviewStylist/>
        },
        {
          path: "viewappointment",
          element: <StylistPage />
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
      path: "manager",
      element: (
        <ProtectRouteAuth allowedRoles={["MANAGER"]}>
          <DashboardManager />
        </ProtectRouteAuth>
      ),
      children: [
        {
          path: "",
          element: <OverviewManager/>
        },
        {
          path: "viewtransation",
          element: <ViewTransation />
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
      path: "viewmanager",
      element: <ViewManager />,
    },
    {
      path: "viewstylist",
      element: <ViewStylist />,
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
