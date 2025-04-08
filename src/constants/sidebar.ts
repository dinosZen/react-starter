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
    title: "Dashboard",
    url: "/",
    icon: Gauge,
  },
  {
    title: "Users",
    url: "/users",
    icon: Users,
  },
  {
    title: "Transactions",
    url: "/transactions",
    icon: SwitchCamera,
  },
  {
    title: "Wallets",
    url: "/wallets",
    icon: Wallet,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: FileBarChart2,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];
