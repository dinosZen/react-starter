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
