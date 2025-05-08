export interface Agent {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role?: Role;
  status?: string;
  permissions?: string[];
  page?: number;
}

type FilterField = "role" | "perm" | "status" | "group";

export interface AgentsRequestBody {
  page: number;
  size: number;
  search?: string;
  orderBy?: string;
  order?: "ASC" | "DESC";
  filters: { field: FilterField; value: string | string[] }[];
}
export interface AgentUpdatePayload {
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
  status?: string;
  permissionsIds?: number[];
}

export type AgentPatchPayload = Partial<AgentUpdatePayload>;
export interface DeleteAgentDialogProps {
  readonly agent: Agent;
  readonly isOpen: boolean;
  onClose: () => void;
}

export interface AgentStatusDialogProps {
  readonly agent: Agent;
  readonly isOpen: boolean;
  onClose: () => void;
}

export interface EditAgentDialogProps {
  readonly agent: Agent;
  readonly isOpen: boolean;
  onClose: () => void;
}

export interface AgentsQueryParams {
  page: number;
  size: number;
  search?: string;
  orderBy?: string;
  order?: "ASC" | "DESC";
  roles?: string[];
  perms?: string[];
  statuses?: string[];
}

export interface DeleteRoleDialogProps {
  readonly role: Role;
  readonly isOpen: boolean;
  onClose: () => void;
}
export interface RolesQueryParams {
  page: number;
  size: number;
  search?: string;
  orderBy?: string;
  order?: "ASC" | "DESC";
  group?: string[];
}

export interface RolesRequestBody {
  page: number;
  size: number;
  search?: string;
  orderBy?: string;
  order?: "ASC" | "DESC";
  filters: { field: FilterField; value: string | string[] }[];
}
export interface Role {
  code: string;
  createdAt: string;
  deletedAt: string | null;
  id: number;
  isActive: boolean;
  permissions: Permission[];
  title: string;
  updatedAt: string;
}

export interface GroupPermissions {
  code: string;
  createdAt: string;
  deletedAt: string | null;
  id: number;
  isActive: boolean;
  permissions: PermissionPerAgent[];
  title: string;
  updatedAt: string;
}
interface Group {
  id: number;
  title: string;
  code?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: null | string;
  isActive?: boolean;
}
export interface Permission {
  code: string;
  createdAt: string;
  deletedAt: string | null;
  group: Group;
  id: number;
  isActive: boolean;
  default: boolean;
  title: string;
  updatedAt: string;
}
export interface PermissionPerAgent {
  code: string;
  createdAt: string;
  deletedAt: string | null;
  id: number;
  isActive: boolean;
  title: string;
  updatedAt: string;
  default: boolean;
  selected: boolean;
}
