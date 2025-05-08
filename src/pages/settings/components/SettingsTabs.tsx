import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AgentsTab } from "./tabs/agents/AgentsTab";
import { RolesTab } from "./tabs/roles/RolesTab";

export type TabItem = {
  id: string;
  label: string;
};

interface SettingsTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const SettingsTabs = ({
  tabs,
  activeTab,
  onTabChange,
}: SettingsTabsProps) => {
  return (
    <Tabs
      value={activeTab}
      onValueChange={onTabChange}
      className="w-full gap-0"
    >
      <TabsList className="my-0">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.id} value={tab.id} className="cursor-pointer">
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      <div>
        <TabsContent value="agents">
          <AgentsTab isActive={activeTab === "agents"} />
        </TabsContent>
        <TabsContent value="roles">
          <RolesTab isActive={activeTab === "roles"} />
        </TabsContent>
        <TabsContent value="notifications">Notifications...</TabsContent>
        <TabsContent value="support & Help">Support & Help...</TabsContent>
      </div>
    </Tabs>
  );
};
