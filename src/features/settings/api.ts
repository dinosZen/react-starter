import api from "@/api/axios";
import { GroupPermissions, Role } from "./types";

export async function fetchRoles(): Promise<Role[]> {
  const response = await api.get("/roles");
  return response.data.data;
}

export async function fetchPermissionsGrouped(): Promise<GroupPermissions[]> {
  const response = await api.get("/permissions/grouped");
  return response.data.data;
}
