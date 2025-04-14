export interface Agent {
  id?: number;
  name: string;
  email: string;
  roleId?: {
    label: string;
    value: number;
  };
  status?: string;
  permissions?: string[];
}
