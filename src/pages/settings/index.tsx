import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "./components/DataTable";
import { useTranslation } from "react-i18next";
import { useAgentColumns } from "./table-columns/AgentColumns";
import { AgentDialog } from "./components/AddNewAgentDialog";
import { agentTableMockData } from "@/lib/constants";
import { useEffect, useState } from "react";
import { useAgents } from "./api/agent/getAgents";

function Settings() {
  const getAgentsColumns = useAgentColumns();
  const agentsColumns = getAgentsColumns();
  const { t } = useTranslation();

  const { data: agentsData, isLoading: isLoadingAgents } = useAgents();

  //console.log("agentsData", agentsData, "isLoadingAgents", isLoadingAgents);
  ///////
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  /////
  return (
    <>
      <section className="flex flex-row items-center justify-between border-b border-b-slate-200 p-6">
        <header>
          <h1 className="text-3xl font-bold pb-3">Settings Page</h1>
          <p>Manage your account settings and set e-mail preferences.</p>
        </header>
        <div
          className="grid w-full max-w-sm items-center gap-1.5 relative"
          role="search"
        >
          <div className="relative">
            <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
              <Search className="h-4 w-4" aria-hidden="true" />
            </div>
            <Input
              id="search"
              type="search"
              placeholder={t("searchPlaceholder")}
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
                {t("settings.agents")}
              </TabsTrigger>
              <TabsTrigger value="roles" className="cursor-pointer">
                {t("settings.roles")}
              </TabsTrigger>
              <TabsTrigger value="notifications" className="cursor-pointer">
                {t("settings.notifications")}
              </TabsTrigger>
              <TabsTrigger value="support" className="cursor-pointer">
                {t("settings.supportHelp")}
              </TabsTrigger>
            </TabsList>
            <AgentDialog />
          </div>
          <TabsContent value="agents">
            <DataTable
              columns={agentsColumns}
              data={agentTableMockData}
              isLoading={isLoading}
            />
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
