import api from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
import { AgentsQueryParams, GroupPermissions, Role } from "./types";

export async function fetchRoles(): Promise<Role[]> {
  const response = await api.get("/roles");
  return response.data.data;
}

export async function fetchPermissionsGrouped(
  agentId: number,
  roleId: number | undefined
): Promise<GroupPermissions[]> {
  const response = await api.get(
    `/permissions/grouped/${agentId}?roleId=${roleId}`
  );
  return response.data.data;
}

export async function assignRoleAndPermissions(params: {
  agentId: number;
  roleId: number;
  permissionsIds: number[];
}) {
  const response = await api.patch(
    `/agents/assignRoleAndPermissions/${params.agentId}`,
    {
      roleId: params.roleId,
      permissionsIds: params.permissionsIds,
    }
  );
  return response.data.data;
}
//Get all agents
export function useAgents({
  page,
  size,
  search = "",
  orderBy = "role",
  order = "DESC",
}: AgentsQueryParams) {
  return useQuery({
    queryKey: ["agents", page, size, search, orderBy, order],

    queryFn: () =>
      api
        .get("/agents", { params: { page, size, search, orderBy, order } })
        .then((r) => r.data),
    staleTime: Infinity,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
  });
}

//delete an agent
export const deleteAgent = async (agentId: string) => {
  const response = await api.delete(`/agents/${agentId}`);
  return response.data;
};

//Add new agent
export async function addNewAgent(data: {
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
}) {
  const response = await api.post("/agents/create", data);
  return response.data;
}
