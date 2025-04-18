import axiosInstance from "@/api/axios";

//delete an agent
export const deleteAgent = async (agentId: string) => {
  const response = await axiosInstance.delete(`/agents/${agentId}`);
  return response.data;
};
