import { useMutation, useQuery } from "@tanstack/react-query";
import {
  assignRoleAndPermissions,
  fetchPermissionsGrouped,
  fetchRoles,
} from "./api";
import { GroupPermissions, Role } from "./types";

export const useRoles = () => {
  const {
    data: roles,
    isLoading,
    isError,
    refetch,
  } = useQuery<Role[], Error>({
    queryKey: ["roles"],
    queryFn: fetchRoles,
  });

  return { roles, isLoading, isError, refetch };
};

export const usePermissionsGrouped = (
  agentId: number,
  roleId: number | undefined,
  isEnabled: boolean
) => {
  const {
    data: permissionsGroups,
    isLoading,
    isError,
    refetch,
  } = useQuery<GroupPermissions[], Error>({
    queryKey: ["permissionsGrouped", agentId, roleId],
    queryFn: () => fetchPermissionsGrouped(agentId, roleId),
    enabled: isEnabled,
    staleTime: 1000 * 60 * 5,
  });

  return { permissionsGroups, isLoading, isError, refetch };
};

export const useAssignRoleAndPermissions = () => {
  return useMutation({
    mutationFn: (params: {
      agentId: number;
      roleId: number;
      permissionsIds: number[];
    }) => {
      return assignRoleAndPermissions(params);
    },
  });
};
