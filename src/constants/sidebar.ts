import i18next from "i18next";
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
    title: i18next.t("sidebar.dashboard"),
    url: "/",
    icon: Gauge,
  },
  {
    title: i18next.t("sidebar.users"),
    url: "/users",
    icon: Users,
  },
  {
    title: i18next.t("sidebar.transactions"),
    url: "/transactions",
    icon: SwitchCamera,
  },
  {
    title: i18next.t("sidebar.wallets"),
    url: "/wallets",
    icon: Wallet,
  },
  {
    title: i18next.t("sidebar.reports"),
    url: "/reports",
    icon: FileBarChart2,
  },
  {
    title: i18next.t("sidebar.settings"),
    url: "/settings",
    icon: Settings,
  },
];
