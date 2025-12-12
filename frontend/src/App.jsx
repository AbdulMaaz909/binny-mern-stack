import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AdminDashboard, Login, Register } from "./pages";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/dashboard/user_dashboard/Dashboard";

const Home = () => (
  <div>
    <h2>Website Home</h2>
    <p>Public/Protected content for regular users.</p>
  </div>
);

// const AdminDashboard = () => (
//   <div>
//     <h2>Admin Dashboard</h2>
//     <p>Admin-only area.</p>
//   </div>
// );

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Website protected routes - requires authentication */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* add other protected website routes here */}
        </Route>

        {/* Admin protected routes - requires authenticated admin */}
        <Route element={<AdminRoute />}>
          <Route path="/admindashboard" element={<AdminDashboard />} />
        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;
