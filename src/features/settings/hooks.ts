import { useQuery } from "@tanstack/react-query";
import { fetchPermissionsGrouped, fetchRoles } from "./api";
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

export const usePermissionsGrouped = () => {
  const {
    data: permissions,
    isLoading,
    isError,
    refetch,
  } = useQuery<GroupPermissions[], Error>({
    queryKey: ["permissionsGrouped"],
    queryFn: fetchPermissionsGrouped,
  });

  return { permissions, isLoading, isError, refetch };
};
