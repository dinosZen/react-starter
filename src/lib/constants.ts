export const agentRoleOptions = [
  {
    label: "Super Agent",
    value: "super",
  },
  {
    label: "Admin Agent",
    value: "admin",
  },
  {
    label: "Support Agent",
    value: "support",
  },
  {
    label: "Read-Only Agent",
    value: "read-only",
  },
  {
    label: "Transaction Agent",
    value: "transaction",
  },
];

export const agentTableMockData = [
  {
    id: 1,
    name: "John Doe1",
    email: "Sample@mail.com",
    role: {
      label: "Super Agent",
      value: "super",
    },
    status: "active",
    permissions: [],
  },
  {
    id: 2,
    name: "John Doe2",
    email: "Sample@mail.com",
    role: {
      label: "Admin Agent",
      value: "admin",
    },
    status: "pending",
    permissions: ["read", "create", "manage", "reject", "archive", "restore"],
  },
  {
    id: 3,
    name: "John Doe3",
    email: "Sample@mail.com",
    role: {
      label: "Support Agent",
      value: "support",
    },
    status: "suspended",
    permissions: [],
  },
  {
    id: 4,
    name: "John Doe4",
    email: "Sample@mail.com",
    role: {
      label: "Read-Only Agent",
      value: "read-only",
    },
    status: "revoked",
    permissions: ["reject", "archive", "restore"],
  },
  {
    id: 5,
    name: "John Doe5",
    email: "Sample@mail.com",
    role: {
      label: "Transaction Agent",
      value: "transaction",
    },
    status: "expired",
    permissions: ["approve", "reject", "archive", "restore"],
  },
];
