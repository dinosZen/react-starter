import { useRefresh } from "@/features/auth/hooks";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";

function Header() {
  const handleRefresh = () => {
    refresh.mutate();
  };
  const refresh = useRefresh();

  return (
    <div className="p-4">
      <SidebarTrigger />
      <Button onClick={handleRefresh}>Refresh</Button>
    </div>
  );
}

export default Header;
