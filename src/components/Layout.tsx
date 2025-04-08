import { Outlet } from "react-router-dom";
import Header from "./Header";
import { AppSidebar } from "./app-sidebar";
import { SidebarProvider } from "./ui/sidebar";

function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="layout grid grid-cols-[1fr] grid-rows-[auto_1fr] h-screen w-full">
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
