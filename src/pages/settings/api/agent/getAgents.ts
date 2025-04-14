import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export function useAgents() {
  return useQuery({
    queryKey: ["agents"],
    queryFn: async () => {
      console.log("Full URL:", api.getUri({ url: "/agents" }));
      const response = await api.get("/agents");
      console.log("response", response);
      return response.data;
    },
  });
}
