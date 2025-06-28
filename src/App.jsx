import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/User/Layout/Layout";
import Home from "./components/User/Home/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NotFound from "./components/Utils/NotFound/NotFound";
import { Toaster } from "react-hot-toast";
import Login from "./components/Auth/Login/Login";
import AdminLayout from "./components/Admin/AdminLayout/AdminLayout";
import CreateReservation from "./components/User/CreateReservation/CreateReservation";
import AllReservations from "./components/User/AllReservations/AllReservations";
import RequireLogin from "./components/Utils/RequiredLogin/RequiredLogin";
import Orders from "./components/User/Orders/Orders";
import Payment from "./components/User/Payment/Payment";
import PaymentResult from "./components/User/PaymentResult/PaymentResult";
import Menu from "./components/User/Menu/Menu";
import MenuCategory from "./components/User/MenuCategory/MenuCategory";
import MenuItemDetails from "./components/User/MenuItemDetails/MenuItemDetails";
import Cart from "./components/User/Cart/Cart";
import AdminBranches from "./components/Admin/AdminBranches/AdminBranches";
import AadminCategories from "./components/Admin/AdminCategories/AadminCategories";
import AdminFoods from "./components/Admin/AdminFoods/AdminFoods";
import AdminTables from "./components/Admin/AdminTables/AdminTables";
import WelcomeAdmin from "./components/Admin/WelcomeAdmin/WelcomeAdmin";
import ManageUsers from "./components/Admin/ManageUsers/ManageUsers";
import ForgetPassword from "./components/Auth/ForgetPassword/ForgetPassword";
import ResetPassword from "./components/Auth/ResetPassword/ResetPassword";
import AuthLayoout from "./components/Auth/AuthLayoout/AuthLayout";
import Register from "./components/Auth/Register/Register";
import { CartContextProvider } from "./Context/CartCotext";
import AuthContextProvider from "./Context/AuthContext";
import AdminOrders from "./components/Admin/AdminOrders/AdminOrders";

function App() {
  const routes = createBrowserRouter([
    {
      path: "auth",
      element: <AuthLayoout />,
      children: [
        { index: true, element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forgetpassword", element: <ForgetPassword /> },
        { path: "resetpassword", element: <ResetPassword /> },
        { path: "*", element: <NotFound /> },
      ],
    },

    {
      path: "",
      element: <Layout />,
      children: [
        { index:true , element: <Home /> },

        {
          path: "reservation",
          element: (
            <RequireLogin allowedRoles={["user"]}>
              <CreateReservation />
            </RequireLogin>
          ),
        },
        {
          path: "allReservations",
          element: (
            <RequireLogin allowedRoles={["user"]}>
              <AllReservations />
            </RequireLogin>
          ),
        },
        { path: "requiredLogin", element: <RequireLogin /> },
        {
          path: "orders",
          element: (
            <RequireLogin allowedRoles={["user"]}>
              <Orders />
            </RequireLogin>
          ),
        },
        {
          path: "orders/success/:id",
          element: <PaymentResult paymentStatus={"success"} />,
        },
        {
          path: "orders/cancel/:id",
          element: <PaymentResult paymentStatus={"cancel"} />,
        },
        {
          path: "cart",
          element: (
            <RequireLogin allowedRoles={["user"]}>
              <Cart />
            </RequireLogin>
          ),
        },
        {
          path: "payment",
          element: (
            <RequireLogin allowedRoles={["user"]}>
              <Payment />
            </RequireLogin>
          ),
        },
        {
          path: "menu",
          element: <Menu />,
          children: [
            { path: "", element: <MenuCategory /> },
            { path: ":id", element: <MenuCategory /> },
          ],
        },
        { path: "foodDetails/:foodId", element: <MenuItemDetails /> },
        { path: "*", element: <NotFound /> },
      ],
    },

    {
      path: "admin",
      element: <AdminLayout />,
      children: [
        { index: true, element: <WelcomeAdmin /> },
        { path: "categories", element: <AadminCategories /> },
        { path: "branches", element: <AdminBranches /> },
        { path: "foods", element: <AdminFoods /> },
        { path: "tables", element: <AdminTables /> },
        { path: "orders", element: <AdminOrders /> },
        { path: "users", element: <ManageUsers /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  const queryClient = new QueryClient();

  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <CartContextProvider>
          <Toaster 
            toastOptions={{
            duration: 6000,
            }}
          />
        <RouterProvider router={routes}></RouterProvider>
        </CartContextProvider>
      </QueryClientProvider>
    </AuthContextProvider>
  );
}

export default App;

