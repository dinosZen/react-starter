import api from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
export interface AgentsQueryParams {
  page: number;
  size: number;
  search?: string;
  orderBy?: string;
  order?: "ASC" | "DESC";
}

export function useAgents({
  page,
  size,
  search = "",
  orderBy = "role",
  order = "DESC",
}: AgentsQueryParams) {
  return useQuery({
    queryKey: ["agents", { page, size, search, orderBy, order }],
    queryFn: async () => {
      const { data } = await api.get("/agents", {
        params: { page, size, search, orderBy, order },
      });
      return data;
    },
    //keepPreviousData: true,
  });
}
