import { Outlet } from "react-router-dom";
import Header from "./Header";
import { AppSidebar } from "./app-sidebar";
import { SidebarProvider } from "./ui/sidebar";

function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="layout grid grid-cols-[1fr] grid-rows-[auto_1fr] h-screen  w-full">
        <Header />
        <div className="layout-content grid grid-cols-[auto_1fr] grid-rows-[1fr]">
          <main className="p-4">
            <h1 className="text-2xl font-bold">Main Content</h1>
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default Layout;
