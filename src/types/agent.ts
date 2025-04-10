export interface Agent {
  id: number;
  name: string;
  email: string;
  role: {
    label: string;
    value: string;
  };
  status: string;
  permissions: string[];
}
