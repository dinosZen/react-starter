import SidebarLogo from "@/assets/images/logos/sidebarLogo.svg";
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
import { useSidebarStore } from "@/store/sidebar";
import { jwtDecode } from "jwt-decode";
import { useTranslation } from "react-i18next";
import { NavUser } from "./nav-user";

export function AppSidebar() {
  const { t } = useTranslation();
  const userCookie = getCookieValue("access_token");
  const { isCollapsed } = useSidebarStore();
  const user = userCookie
    ? jwtDecode<JwtlUser>(userCookie)
    : { email: "", firstName: "", lastName: "", avatar: "" };

  return (
    <Sidebar collapsible={"icon"}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className={`relative group flex items-center`}>
                <a href="/" className="flex items-center gap-2">
                  <img
                    src={SidebarLogo}
                    alt="Cambix"
                    className={
                      isCollapsed
                        ? "opacity-100 group-hover:opacity-0 transition-opacity duration-200"
                        : ""
                    }
                  />
                  {!isCollapsed && <span>Cambix</span>}
                </a>

                <div
                  className={`
      transition-opacity duration-200
      ${
        isCollapsed
          ? "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
          : "ml-auto opacity-100 relative"
      }
    `}
                >
                  <SidebarTrigger />
                </div>
              </div>
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
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
