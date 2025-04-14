import api from "@/lib/axios";

export async function createAgent(data: {
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
}) {
  const response = await api.post("/agents/create", data);
  return response.data;
}
