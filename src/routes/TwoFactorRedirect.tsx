import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const TwoFactorRedirect = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { checkLoggingIn, isLoggingIn } = useAuthStore();

  useEffect(() => {
    checkLoggingIn();
    if (!isLoggingIn) {
      navigate("/login");
    }
  }, [navigate, checkLoggingIn, isLoggingIn]);

  return <>{children}</>;
};
