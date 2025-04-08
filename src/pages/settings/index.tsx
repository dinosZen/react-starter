import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export function ButtonDemo() {
  return <Button>Button</Button>;
}

function Settings() {
  return (
    <div>
      <section className="flex flex-row items-center justify-between border-b border-b-slate-200 p-6">
        <header>
          <h1 className="text-3xl font-bold pb-3">Settings Page</h1>
          <p>Manage your account settings and set e-mail preferences.</p>
        </header>
        <div className="grid w-full max-w-sm items-center gap-1.5 relative">
          <div className="relative">
            <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
              <Search className="h-4 w-4" />
            </div>
            <Input
              id="search"
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8"
            />
          </div>
        </div>
      </section>
      <section className="w-full p-6">
        <Tabs defaultValue="agents" className="w-full">
          <div className="flex flex-row items-center justify-between w-full">
            <TabsList>
              <TabsTrigger value="agents" className="cursor-pointer">
                Agents
              </TabsTrigger>
              <TabsTrigger value="roles" className="cursor-pointer">
                Roles
              </TabsTrigger>
              <TabsTrigger value="notifications" className="cursor-pointer">
                Notifications
              </TabsTrigger>
              <TabsTrigger value="support" className="cursor-pointer">
                Support & Help
              </TabsTrigger>
            </TabsList>
            <Button>
              <Plus /> Add new
            </Button>
          </div>

          <TabsContent value="agents">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="roles">Change your roles here.</TabsContent>
          <TabsContent value="notifications">
            Change your notifications here.
          </TabsContent>
          <TabsContent value="support">Get support and help here.</TabsContent>
        </Tabs>
      </section>
    </div>
  );
}

export default Settings;
