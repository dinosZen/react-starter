export const agentRoleOptions = [
  {
    label: "Super Agent",
    value: 13,
  },
  {
    label: "Admin Agent",
    value: 14,
  },
  {
    label: "Support Agent",
    value: 15,
  },
  {
    label: "Read-Only Agent",
    value: 16,
  },
  {
    label: "Transaction Agent",
    value: 17,
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
  {
    id: 6,
    name: "John Doe6",
    email: "sample@mail.com",
    role: {
      label: "Super Agent",
      value: "super",
    },
    status: "active",
    permissions: ["read", "create", "manage"],
  },
  {
    id: 7,
    name: "John Doe7",
    email: "sample@mail.com",
    role: {
      label: "Admin Agent",
      value: "admin",
    },
    status: "pending",
    permissions: ["read", "create", "manage", "reject", "archive", "restore"],
  },
  {
    id: 8,
    name: "John Doe8",
    email: "sample@mail.com",
    role: {
      label: "Support Agent",
      value: "support",
    },
    status: "suspended",
    permissions: ["read", "create"],
  },
  {
    id: 9,
    name: "John Doe9",
    email: "sample@mail.com",
    role: {
      label: "Read-Only Agent",
      value: "read-only",
    },
    status: "revoked",
    permissions: ["read", "create", "manage"],
  },
  {
    id: 10,
    name: "John Doe10",
    email: "sample@mail.com",
    role: {
      label: "Transaction Agent",
      value: "transaction",
    },
    status: "expired",
    permissions: ["approve", "reject", "archive", "restore"],
  },
  {
    id: 11,
    name: "John Doe11",
    email: "sample@mail.com",
    role: {
      label: "Super Agent",
      value: "super",
    },
    status: "active",
    permissions: ["read", "create", "manage"],
  },
  {
    id: 12,
    name: "John Doe12",
    email: "sample@mail.com",
    role: {
      label: "Admin Agent",
      value: "admin",
    },
    status: "pending",
    permissions: ["read", "create", "manage", "reject", "archive", "restore"],
  },
];
export const usersTableMockData = [
  {
    id: 1,
    name: "John Doe1",
    email: "Sample@mail.com",
    createdAt: "2023-10-01",
    status: "active",
  },
  {
    id: 2,
    name: "John Doe2",
    email: "Sample@mail.com",
    createdAt: "2023-10-01",
    status: "pending",
  },
  {
    id: 3,
    name: "John Doe3",
    email: "Sample@mail.com",
    createdAt: "2023-10-01",
    status: "suspended",
  },
  {
    id: 4,
    name: "John Doe4",
    email: "Sample@mail.com",
    createdAt: "2023-10-01",
    status: "revoked",
  },
  {
    id: 5,
    name: "John Doe5",
    email: "Sample@mail.com",
    createdAt: "2023-10-01",
    status: "expired",
  },
  {
    id: 6,
    name: "John Doe6",
    email: "sample@mail.com",
    createdAt: "2023-10-01",
    status: "active",
  },
  {
    id: 7,
    name: "John Doe7",
    email: "sample@mail.com",
    createdAt: "2023-10-01",
    status: "pending",
  },
  {
    id: 8,
    name: "John Doe8",
    email: "sample@mail.com",
    createdAt: "2023-10-01",
    status: "suspended",
  },
  {
    id: 9,
    name: "John Doe9",
    email: "sample@mail.com",
    createdAt: "2023-10-01",
    status: "revoked",
  },
  {
    id: 10,
    name: "John Doe10",
    email: "sample@mail.com",
    createdAt: "2023-10-01",
    status: "expired",
  },
  {
    id: 11,
    name: "John Doe11",
    email: "sample@mail.com",
    createdAt: "2023-10-01",
    status: "active",
  },
  {
    id: 12,
    name: "John Doe12",
    email: "sample@mail.com",
    createdAt: "2023-10-01",
    status: "pending",
  },
];
