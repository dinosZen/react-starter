import { Outlet } from "react-router-dom";
import Header from "./Header";
import { AppSidebar } from "./app-sidebar";
import { SidebarProvider } from "./ui/sidebar";
import { getCookieValue } from "@/lib/cookies";

function Layout() {
  const defaultOpen = getCookieValue("sidebar_state") === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <div className="layout grid grid-cols-[1fr] grid-rows-[auto_1fr] w-full bg-background-secondary-default">
        <Header />
        <div className="layout-content grid grid-cols-[auto_1fr] grid-rows-[1fr]">
          <main className="col-span-full">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default Layout;
