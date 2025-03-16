import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";
import Dashboard from "../Pages/Dashboard.tsx";
import Invoices from "../Pages/Invoice.tsx";
import Expenses from "../Pages/Expenses.tsx";
import Payments from "../Pages/Payments.tsx";
import Reports from "../Pages/Reports.tsx";
import Settings from "../Pages/Settings.tsx";

const Router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { path: "/", element: <Dashboard /> },
        { path: "/invoice", element: <Invoices /> },
        { path: "/expenses", element: <Expenses /> },
        { path: "/payments", element: <Payments /> },
        { path: "/reports", element: <Reports /> },
        { path: "/settings", element: <Settings /> },
      ]
    }
  ],

);

export default Router;