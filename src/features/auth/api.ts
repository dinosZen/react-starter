import axiosInstance from "@/api/axios";
import { LoginRequest, LoginResponse } from "./types";

export async function loginUser(data: LoginRequest): Promise<LoginResponse> {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data;
}
