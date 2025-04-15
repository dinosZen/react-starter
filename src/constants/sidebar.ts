import {
  FileBarChart2,
  Gauge,
  Settings,
  SwitchCamera,
  Users,
  Wallet,
} from "lucide-react";

export const SidebarItems = [
  {
    title: "sidebar.dashboard",
    url: "/",
    icon: Gauge,
  },
  {
    title: "sidebar.users",
    url: "/users",
    icon: Users,
  },
  {
    title: "sidebar.transactions",
    url: "/transactions",
    icon: SwitchCamera,
  },
  {
    title: "sidebar.wallets",
    url: "/wallets",
    icon: Wallet,
  },
  {
    title: "sidebar.reports",
    url: "/reports",
    icon: FileBarChart2,
  },
  {
    title: "sidebar.settings",
    url: "/settings",
    icon: Settings,
  },
];
