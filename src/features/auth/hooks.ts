import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "./api";
import { LoginRequest } from "./types";
import { setCookieValue } from "@/lib/cookies";
import { AxiosError } from "axios";

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => loginUser(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      setCookieValue("access_token", response.data.access_token);
      setCookieValue("user", JSON.stringify(response.data.user));
      window.location.href = "/";
    },
    onError: (error: AxiosError) => {
      if (error.response) {
        console.error("Error:", error.response.data);
      } else {
        console.error("Error:", error.message);
      }
    },
  });
}
