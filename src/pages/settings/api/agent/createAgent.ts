import axiosInstance from "@/api/axios";

export async function createAgent(data: {
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
}) {
  const response = await axiosInstance.post("/agents/create", data);
  return response.data;
}
