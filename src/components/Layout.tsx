import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideNav from "./Sidenav";

function Layout() {
  return (
    <div className="layout grid grid-cols-[1fr] grid-rows-[auto_1fr] h-screen">
      <Header />
      <div className="layout-content grid grid-cols-[auto_1fr] grid-rows-[1fr]">
        <SideNav />
        <main className="p-4">
          <h1 className="text-2xl font-bold">Main Content</h1>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
