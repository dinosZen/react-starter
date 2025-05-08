import api from "@/api/axios";
import {
  CreatePasswordRequest,
  CreatePasswordResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LoginResponse,
  ValidateRequest,
  ValidateResponse,
  VerifyRequest,
  VerifyResponse,
} from "./types";

export async function loginUser(data: LoginRequest): Promise<LoginResponse> {
  const response = await api.post("/auth/login", data);
  return response.data;
}

export async function verifyUser(data: VerifyRequest): Promise<VerifyResponse> {
  const response = await api.post("/auth/2fa/verify-setup", data);
  return response.data;
}

export async function validateUser(
  data: ValidateRequest
): Promise<ValidateResponse> {
  const response = await api.post("/auth/2fa/validate-login", data);
  return response.data;
}

export async function createPassword(
  data: CreatePasswordRequest
): Promise<CreatePasswordResponse> {
  const response = await api.post("/auth/create-password", data);
  return response.data;
}

export async function forgotPassword(
  data: ForgotPasswordRequest
): Promise<ForgotPasswordResponse> {
  const response = await api.post("/auth/forgot-password", data);
  return response.data;
}

export async function logoutUser(): Promise<ValidateResponse> {
  const response = await api.post("/auth/logout");
  return response.data;
}
