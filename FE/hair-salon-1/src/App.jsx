import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import HomePage from "./pages/homepage";
import ManageService from "./pages/staff/manage-service";
import Dashboard from "./components/dashboard";
import Layout from "./components/layout";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Booking from "./pages/book";
import ProfileCustomer from "./pages/profile/customer/view";
import ViewCustomer from "./pages/profile/customer/view";
import UpdateCustomer from "./pages/profile/customer/update";

function App() {
  const ProtectRouteAuth = ({ children }) => {
    const user = useSelector((store) => store.user);
    console.log(user);
    if (user && user?.role === "CUSTOMER") {
      //Customize the role
      return children;
    }
    toast.error("Not allow");
    return <Navigate to={"/login"} />;
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
          path: "booking",
          element: <Booking />,
        },
        // {
        //   path: "confirm",
        //   element: <ConfirmBooking />,
        // },
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
      path: "dashboard",
      element: (
        <ProtectRouteAuth>
          <Dashboard />
        </ProtectRouteAuth>
      ),
      children: [
        {
          path: "service",
          element: <ManageService />,
        },
      ],
    },
    {
      path: "customer",
      element: <ViewCustomer />,
      children: [
        {
          path: "customer-update",
          element: <UpdateCustomer />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
