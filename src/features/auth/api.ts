import axiosLoginInstance from "@/api/authAxios";
import axiosLogoutInstance from "@/api/axios";
import {
  LoginRequest,
  LoginResponse,
  ValidateRequest,
  ValidateResponse,
  VerifyRequest,
  VerifyResponse,
} from "./types";

export async function loginUser(data: LoginRequest): Promise<LoginResponse> {
  const response = await axiosLoginInstance.post("/auth/login", data);
  return response.data;
}

export async function verifyUser(data: VerifyRequest): Promise<VerifyResponse> {
  const response = await axiosLoginInstance.post(
    "/auth/2fa/verify-setup",
    data
  );
  return response.data;
}

export async function validateUser(
  data: ValidateRequest
): Promise<ValidateResponse> {
  const response = await axiosLoginInstance.post(
    "/auth/2fa/validate-login",
    data
  );
  return response.data;
}

export async function logoutUser(): Promise<ValidateResponse> {
  const response = await axiosLogoutInstance.post("/auth/logout");
  return response.data;
}
