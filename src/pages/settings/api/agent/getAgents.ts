import axiosInstance from "@/api/axios";
import { useQuery } from "@tanstack/react-query";

export function useAgents() {
  return useQuery({
    queryKey: ["agents"],
    queryFn: async () => {
      const response = await axiosInstance.get("/agents");
      console.log("response", response);
      return response.data;
    },
  });
}
