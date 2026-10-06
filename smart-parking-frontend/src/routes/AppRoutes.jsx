import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";

import UserDashboard from "../pages/UserDashboard/UserDashboard";
import Parking from "../pages/Parking/Parking";
import Booking from "../pages/Booking/Booking";
import Vehicle from "../pages/Vehicle/Vehicle";
import BookingHistory from "../pages/BookingHistory/BookingHistory";

import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";

import PublicLayout from "../layouts/PublicLayout";
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";

import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC */}

      <Route
        path="/"
        element={
          <PublicLayout>
            <Home />
          </PublicLayout>
        }
      />

      <Route
        path="/about"
        element={
          <PublicLayout>
            <About />
          </PublicLayout>
        }
      />

      {/* AUTH PAGES
          No PublicLayout here.
          These pages have their own full-screen design.
      */}

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      {/* USER */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <UserLayout>
              <UserDashboard />
            </UserLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/parking"
        element={
          <ProtectedRoute>
            <UserLayout>
              <Parking />
            </UserLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/booking"
        element={
          <ProtectedRoute>
            <UserLayout>
              <Booking />
            </UserLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/vehicles"
        element={
          <ProtectedRoute>
            <UserLayout>
              <Vehicle />
            </UserLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/booking-history"
        element={
          <ProtectedRoute>
            <UserLayout>
              <BookingHistory />
            </UserLayout>
          </ProtectedRoute>
        }
      />

      {/* ADMIN */}

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;