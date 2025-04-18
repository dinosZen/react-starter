import { useMutation } from "@tanstack/react-query";
import { loginUser, logoutUser, validateUser, verifyUser } from "./api";
import { LoginRequest, VerifyRequest } from "./types";
import { clearCookie, setCookieValue } from "@/lib/cookies";
import { AxiosError } from "axios";
import { useTwoFactorStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export function useLogin() {
  const { setSecret } = useTwoFactorStore();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (data: LoginRequest) => loginUser(data),
    onSuccess: (response) => {
      setCookieValue("partial_token", response.data.partial_token);
      if (response.data.secret) {
        setSecret(response.data.secret);
        navigate("/verify-login");
      } else {
        window.location.href = "/validate-login";
      }
    },
    onError: (error: AxiosError) => {
      if (error.response) {
        if (error.response.status === 404 || error.response.status === 401) {
          toast(t("login.toast.incorrectCredentials"));
        } else {
          toast.error(t("login.toast.somethinWentWrong"));
        }
      } else {
        console.error("Error:", error.message);
      }
    },
  });
}

export function useVerify() {
  const { clearSecret } = useTwoFactorStore();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (data: VerifyRequest) => verifyUser(data),
    onSuccess: (response) => {
      setCookieValue("access_token", response.data.access_token);
      clearCookie("partial_token");
      clearSecret();
      navigate("/");
    },
    onError: (error: AxiosError) => {
      if (error.response) {
        console.error("Error:", error.response.data);
        if (error.response.status === 401) {
          toast(t("verifyLogin.toast.incorrectCode"));
        } else {
          toast.error(t("verifyLogin.toast.somethinWentWrong"));
        }
      } else {
        console.error("Error:", error.message);
      }
    },
  });
}

export function useValidate() {
  const { clearSecret } = useTwoFactorStore();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (data: VerifyRequest) => validateUser(data),
    onSuccess: (response) => {
      setCookieValue("access_token", response.data.access_token);
      clearCookie("partial_token");
      clearSecret();
      navigate("/");
    },
    onError: (error: AxiosError) => {
      if (error.response) {
        console.error("Error:", error.response.data);
        if (error.response.status === 401) {
          toast(t("validateLogin.toast.incorrectCode"));
        } else {
          toast.error(t("validateLogin.toast.somethinWentWrong"));
        }
      } else {
        console.error("Error:", error.message);
      }
    },
  });
}

export function useLogout() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: () => {
      clearCookie("access_token");
      navigate("/login");
    },
    onError: (error: AxiosError) => {
      if (error.response) {
        if (error) console.error("Error:", error.response.data);
      } else {
        console.error("Error:", error.message);
      }
    },
  });
}
