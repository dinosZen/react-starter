import { useAuth } from "@/hooks/useAuth";
import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({
  children,
}: Readonly<ProtectedRouteProps>) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) return null; //Add loading spinner later
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
