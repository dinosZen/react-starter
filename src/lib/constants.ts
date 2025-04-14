export const agentRoleOptions = [
  {
    label: "Super Agent",
    value: 1,
  },
  {
    label: "Admin Agent",
    value: 2,
  },
  {
    label: "Support Agent",
    value: 3,
  },
  {
    label: "Read-Only Agent",
    value: 4,
  },
  {
    label: "Transaction Agent",
    value: 5,
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
