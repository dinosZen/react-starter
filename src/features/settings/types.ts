export interface Agent {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role?: {
    label: string;
    value: number;
    code: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    id: number;
    isActive: boolean;
    permissions: string[];
    title: string;
  };
  status?: string;
  permissions?: string[];
  page?: number;
}

export interface EditAgentDialogProps {
  readonly agent: Agent;
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
  permissions: Permission[];
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
