import { getCookieValue } from "@/lib/cookies";

export function useIsLoggingIn() {
  const isLoggingIn = !!getCookieValue("partial_token");
  return { isLoggingIn };
}

export function useIsAuthenticated() {
  const isAuthenticated = !!getCookieValue("access_token");
  return { isAuthenticated };
}
