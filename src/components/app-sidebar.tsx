import SidebarLogo from "@/assets/icons/sidebarLogo.svg";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SidebarItems } from "@/constants/sidebar";
import { JwtlUser } from "@/features/auth/types";
import { getCookieValue } from "@/lib/cookies";
import { jwtDecode } from "jwt-decode";
import { useTranslation } from "react-i18next";
import { NavUser } from "./nav-user";

export function AppSidebar() {
  const { t } = useTranslation();
  const userCookie = getCookieValue("access_token");
  const user = userCookie
    ? jwtDecode<JwtlUser>(userCookie)
    : { email: "", firstName: "", lastName: "", avatar: "" };

  return (
    <Sidebar collapsible={"icon"}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href={"/"}>
                <img src={SidebarLogo} alt="Cambix" />
                <span>Cambix</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {SidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{t(item.title)}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
        <SidebarTrigger />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
