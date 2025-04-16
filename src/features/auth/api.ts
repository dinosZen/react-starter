import axiosInstance from "@/api/authAxios";
import {
  LoginRequest,
  LoginResponse,
  ValidateRequest,
  ValidateResponse,
  VerifyRequest,
  VerifyResponse,
} from "./types";

export async function loginUser(data: LoginRequest): Promise<LoginResponse> {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data;
}

export async function verifyUser(data: VerifyRequest): Promise<VerifyResponse> {
  const response = await axiosInstance.post("/auth/2fa/verify-setup", data);
  return response.data;
}

export async function validateUser(
  data: ValidateRequest
): Promise<ValidateResponse> {
  const response = await axiosInstance.post("/auth/2fa/validate-login", data);
  return response.data;
}
