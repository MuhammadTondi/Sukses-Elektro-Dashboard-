import { createBrowserRouter } from "react-router";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Products } from "./pages/Products";
import { Cashier } from "./pages/Cashier";
import { Order } from "./pages/Order";
import { Suppliers } from "./pages/Suppliers";
import { Reports } from "./pages/Reports";
import { Settings } from "./pages/Settings";
import { Login } from "./pages/Login";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: ProtectedRoute,
    children: [
      {
        Component: Layout,
        children: [
          { index: true, Component: Dashboard },
          { path: "products", Component: Products },
          { path: "cashier", Component: Cashier },
          {
            element: <ProtectedRoute allowedRoles={["admin"]} />,
            children: [
              { path: "order", Component: Order },
              { path: "suppliers", Component: Suppliers },
              { path: "reports", Component: Reports },
              { path: "settings", Component: Settings },
            ],
          },
        ],
      },
    ],
  },
]);
