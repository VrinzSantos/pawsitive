import { NotFoundTitle } from "@/pages/admin/404/404";
import Appointments from "@/pages/admin/Appointments/Appointments";
import Login from "@/pages/admin/Auth/Login";
import Dashboard from "@/pages/admin/Dashboard/Dashboard";
import Feedbacks from "@/pages/admin/Feedbacks/Feedbacks";
import Inventory from "@/pages/admin/Inventory/Inventory";
import Orders from "@/pages/admin/Orders/Orders";
import POS from "@/pages/admin/POS/POS";
import PetOwnerRecords from "@/pages/admin/Pet_owner_records/PetOwnerRecords";
import Settings from "@/pages/admin/Settings/Settings";
import About from "@/pages/client/About/About";
import Doctors from "@/pages/client/Doctors/Doctors";
import Feature from "@/pages/client/Features/Services";
import Home from "@/pages/client/HomePage/Home";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";
import GenerateSales from "@/pages/admin/GenerateSales/GenerateSales";
import SalesDataPDF from "@/pages/admin/GenerateSales/pdf/pdf.sales.data.page";
import InventoryPdfPage from "@/pages/admin/GenerateSales/pdf/pdf.iventory.record.page";
import ClientRecordsPDFPage from "@/pages/admin/GenerateSales/pdf/pdf.client.record.page";
import React from "react";
const router = createBrowserRouter([
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/appointment",
    element: (
      <ProtectedRoute>
        <Appointments />
      </ProtectedRoute>
    ),
  },
  {
    path: "/petowners",
    element: (
      <ProtectedRoute>
        <PetOwnerRecords />
      </ProtectedRoute>
    ),
  },
  {
    path: "/pos",
    element: (
      <ProtectedRoute>
        <POS />
      </ProtectedRoute>
    ),
  },
  {
    path: "/orders",
    element: (
      <ProtectedRoute>
        <Orders />
      </ProtectedRoute>
    ),
  },
  {
    path: "/inventory",
    element: (
      <ProtectedRoute>
        <Inventory />
      </ProtectedRoute>
    ),
  },
  {
    path: "/feedback",
    element: (
      <ProtectedRoute>
        <Feedbacks />
      </ProtectedRoute>
    ),
  },
  {
    path: "/settings",
    element: (
      <ProtectedRoute>
        <Settings />
      </ProtectedRoute>
    ),
  },
  {
    path: "/generate-sales",
    element: (
      <ProtectedRoute>
        <GenerateSales />
      </ProtectedRoute>
    ),
  },
  // PDF
  {
    path: "/sales-pdf-data",
    element: (
      <ProtectedRoute>
        <SalesDataPDF />
      </ProtectedRoute>
    ),
  },
  {
    path: "/inventory-pdf-data",
    element: (
      <ProtectedRoute>
        <InventoryPdfPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/client-record-pdf-data",
    element: (
      <ProtectedRoute>
        <ClientRecordsPDFPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/About",
    element: <About />,
  },
  {
    path: "/Services",
    element: <Feature />,
  },
  {
    path: "/Doctors",
    element: <Doctors />,
  },

  {
    path: "*",
    element: <NotFoundTitle />,
  },
]);
const MainRoutes = () => {
  return <RouterProvider router={router} />;
};

export default MainRoutes;
