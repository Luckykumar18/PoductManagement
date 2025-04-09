import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function ProtectedRoute({ children }) {
  const { authUser, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
