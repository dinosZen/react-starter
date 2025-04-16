import { useMutation } from "@tanstack/react-query";
import { loginUser, verifyUser } from "./api";
import { LoginRequest, VerifyRequest } from "./types";
import { clearCookie, setCookieValue } from "@/lib/cookies";
import { AxiosError } from "axios";
import { useTwoFactorStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const { setSecret } = useTwoFactorStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginRequest) => loginUser(data),
    onSuccess: (response) => {
      setCookieValue("partial_token", response.data.partial_token);
      setCookieValue("partial_user", JSON.stringify(response.data.user));
      setSecret("response.data.secret");

      if (response.data.secret) {
        setSecret(response.data.secret);
        navigate("/verify-login");
      } else {
        window.location.href = "/validate-login";
      }
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

export function useVerify() {
  const { clearSecret } = useTwoFactorStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: VerifyRequest) => verifyUser(data),
    onSuccess: (response) => {
      setCookieValue("access_token", response.data.access_token);
      setCookieValue("user", JSON.stringify(response.data.user));
      clearCookie("partial_cookie");
      clearSecret();
      navigate("/");
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
