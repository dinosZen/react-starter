import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  isAuth: boolean;
  children: React.ReactNode;
}

export default function ProtectedRoute({
  isAuth,
  children,
}: ProtectedRouteProps) {
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
