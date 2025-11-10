import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Pages & Dashboards
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ApplicantDashboard from "./pages/ApplicantDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import VerifyDashboard from "./pages/VerifyDashboard";
import PoliceDashboard from "./pages/PoliceDashboard"; // ✅ Police Dashboard

// 🔐 Role-based route protection
const RoleBasedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" replace />;
  if (role !== userRole) return <Navigate to="/" replace />;
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* 🌐 Public Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* 👤 Applicant Dashboard */}
        <Route
          path="/applicant-dashboard"
          element={
            <RoleBasedRoute role="applicant">
              <ApplicantDashboard />
            </RoleBasedRoute>
          }
        />

        {/* 🛂 Verifying Officer Dashboard */}
        <Route
          path="/verify-dashboard"
          element={
            <RoleBasedRoute role="verifying_officer">
              <VerifyDashboard />
            </RoleBasedRoute>
          }
        />

        {/* 🛡️ Admin Dashboard */}
        <Route
          path="/admin-dashboard"
          element={
            <RoleBasedRoute role="admin">
              <AdminDashboard />
            </RoleBasedRoute>
          }
        />

        {/* 🚓 Police Dashboard */}
        <Route
          path="/police-dashboard"
          element={
            <RoleBasedRoute role="police">
              <PoliceDashboard />
            </RoleBasedRoute>
          }
        />

        {/* 🔁 Catch-All Route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
