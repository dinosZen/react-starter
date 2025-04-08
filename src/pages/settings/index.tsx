import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { useAgentColumns } from "./columns";

const mockData = [
  {
    id: 1,
    name: "John Doe1",
    email: "Sample@mail.com",
    role: "meki agent",
    status: "active",
  },
  {
    id: 2,
    name: "John Doe2",
    email: "Sample@mail.com",
    role: "neki agent",
    status: "pending",
  },
  {
    id: 3,
    name: "John Doe3",
    email: "Sample@mail.com",
    role: "seki agent",
    status: "suspended",
  },
  {
    id: 4,
    name: "John Doe4",
    email: "Sample@mail.com",
    role: "deki agent",
    status: "revoked",
  },
  {
    id: 5,
    name: "John Doe5",
    email: "Sample@mail.com",
    role: "neki agent",
    status: "expired",
  },
];

function Settings() {
  const getAgentsColumns = useAgentColumns();
  const agentsColumns = getAgentsColumns();

  return (
    <>
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
          <div className="flex flex-row items-center justify-between w-full pb-4">
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
            <Dialog>
              <DialogTrigger asChild>
                <Button className="!px-6">
                  <Plus /> Add new
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add new agent</DialogTitle>
                  <DialogDescription>
                    Invite a user by entering their email and assigning a role.
                    They'll get an email to create an account and access the
                    platform based on their role.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2"></div>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button type="button">Close</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <TabsContent value="agents">
            <DataTable columns={agentsColumns} data={mockData} />
          </TabsContent>
          <TabsContent value="roles">Change your roles here.</TabsContent>
          <TabsContent value="notifications">
            Change your notifications here.
          </TabsContent>
          <TabsContent value="support">Get support and help here.</TabsContent>
        </Tabs>
      </section>
    </>
  );
}

export default Settings;
