export const agentRoleOptions = [
  {
    label: "AML officer",
    value: "20",
  },
  {
    label: "Compliance officer",
    value: "21",
  },
  {
    label: "Support team leader",
    value: "22",
  },
  {
    label: "Support staff member",
    value: "23",
  },
  {
    label: "Limited support staff",
    value: "24",
  },
];

// User details mock data
export const settingsTabs = [
  { id: "agents", label: "Agents" },
  { id: "roles", label: "Roles" },
  { id: "notifications", label: "Notifications" },
  { id: "support", label: "Support & Help" },
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

// User details mock data
export const userProfileTabs = [
  { id: "personal", label: "Personal details" },
  { id: "financial", label: "Financial details" },
  { id: "compliance", label: "Compliance" },
  { id: "documents", label: "Documents" },
  { id: "wallets", label: "Wallets" },
  { id: "legal", label: "Legal agreements" },
  { id: "identification", label: "Identification results" },
  { id: "activity", label: "Activity" },
];

export const userProfileMockData = {
  id: 1,
  name: "Bob Johnson",
  email: "mail@mail.com",
  createdAt: "2024-02-02",
  contactsData: [
    {
      label: "Primary email",
      values: ["bob@example.com"],
    },
    {
      label: "Emails",
      values: ["bob1@example.com", "bob2@example.com"],
    },
    {
      label: "Primary phone",
      values: ["+46 70 123 45 67"],
    },
    {
      label: "Phone numbers",
      values: ["+46 73 234 56 78", "+46 76 345 67 89"],
    },
    {
      label: "Full legal address",
      values: ["123 Elm Street", "Stockholm", "Sweden"],
    },
  ],
  personalInfoData: [
    { label: "Unique Public ID", value: "AA87 N84G VYTI 72WI" },
    { label: "Name", value: "Bob Johnson" },
    { label: "Birthdate", value: "17/04/1987" },
    { label: "Nationality", value: "Bosnia and Herzegovina" },
    { label: "Language", value: "English" },
    { label: "Created by", value: "Robby Keane" },
    { label: "Created at", value: "02 Feb 2024" },
    { label: "Last updated at", value: "17 Apr 2025 - 13:26 CET" },
  ],
  settingsData: [
    { label: "Two-factor authentication", value: "Enabled" },
    { label: "Email notifications", value: "Enabled" },
    { label: "SMS notifications", value: "Disabled" },
    { label: "Push notifications", value: "Enabled" },
    { label: "Dark mode", value: "Enabled" },
  ],
};
