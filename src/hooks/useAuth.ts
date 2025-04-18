import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

export function useAuth() {
  const { isAuthenticated, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return { isAuthenticated };
}
