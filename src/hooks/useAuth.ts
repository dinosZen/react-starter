import { getCookieValue } from "@/lib/cookies";
import { useEffect, useState } from "react";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = getCookieValue("access_token");
    setIsAuthenticated(!!token);
  }, []);

  return { isAuthenticated };
}
