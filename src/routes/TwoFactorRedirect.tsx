import { useIsLoggingIn } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const TwoFactorRedirect = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();
  const { isLoggingIn } = useIsLoggingIn();

  useEffect(() => {
    if (!isLoggingIn) {
      navigate("/login");
    }
  }, [navigate, isLoggingIn]);

  return <>{children}</>;
};
