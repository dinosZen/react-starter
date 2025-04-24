import { useIsAuthenticated } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({
  children,
}: Readonly<ProtectedRouteProps>) {
  const navigate = useNavigate();
  const { isAuthenticated } = useIsAuthenticated();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return children;
}
