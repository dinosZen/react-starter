import api from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
import {
  AgentsQueryParams,
  GroupPermissions,
  Role,
  RolesQueryParams,
  RolesRequestBody,
  AgentPatchPayload,
  AgentsRequestBody,
} from "./types";

function buildAgentFilters({
  roles,
  statuses,
}: Pick<AgentsQueryParams, "roles" | "perms" | "statuses">) {
  const out: AgentsRequestBody["filters"] = [];
  if (roles?.length) out.push({ field: "role", value: roles });
  //if (perms?.length) out.push({ field: "perm", value: perms });
  if (statuses?.length) out.push({ field: "status", value: statuses });
  return out;
}
function buildRoleFilters({ group }: Pick<RolesQueryParams, "group">) {
  const out: RolesRequestBody["filters"] = [];
  if (group?.length) out.push({ field: "group", value: group });
  return out;
}

export async function fetchRoles(): Promise<Role[]> {
  const response = await api.post("/roles");
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
  roles,
  statuses,
}: AgentsQueryParams) {
  const queryKey = [
    "agents",
    page,
    size,
    search,
    orderBy,
    order,
    roles,
    statuses,
  ] as const;

  const requestBody: AgentsRequestBody = {
    page,
    size,
    search: search || undefined,
    orderBy: orderBy || undefined,
    order,
    filters: buildAgentFilters({ roles, statuses }),
  };
  return useQuery({
    queryKey,
    queryFn: () => api.post("/agents", requestBody).then((r) => r.data),
    staleTime: Infinity,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
  });
}

//Update agent
export const updateAgent = async (vars: {
  agentId: string;
  data: AgentPatchPayload;
}) => {
  const { agentId, data } = vars;
  const response = await api.patch(`/agents/${agentId}`, data);
  return response.data;
};

//Delete an agent
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
//Get all roles
export function useRoles({
  page,
  size,
  search = "",
  orderBy = "title",
  order = "DESC",
  group,
}: RolesQueryParams) {
  const queryKey = [
    "roles",
    page,
    size,
    search,
    orderBy,
    order,
    group,
  ] as const;

  const requestBody: RolesRequestBody = {
    page,
    size,
    search: search || undefined,
    orderBy: orderBy || undefined,
    order,
    filters: buildRoleFilters({ group }),
  };
  return useQuery({
    queryKey,
    queryFn: () => api.post("/roles", requestBody).then((r) => r.data),
    staleTime: Infinity,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
  });
}
//Get permission groups
export async function fetchPermissionGroups(): Promise<GroupPermissions[]> {
  const response = await api.get("/permissions/groups");
  return response.data.data;
}
// Delete role
export const deleteRole = async (roleId: string) => {
  const response = await api.delete(`/roles/${roleId}`);
  return response.data;
};
//Add new role
export async function addNewRole(data: {
  title: string;
  description: string;
  group: string;
}) {
  const response = await api.post("/roles/create", data);
  return response.data;
}
