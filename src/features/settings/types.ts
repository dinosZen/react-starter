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

export interface DeleteAgentDialogProps {
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

export interface Permission {
  code: string;
  createdAt: string;
  deletedAt: string | null;
  id: number;
  isActive: boolean;
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
