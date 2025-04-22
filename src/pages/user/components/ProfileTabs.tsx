import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type TabItem = {
  id: string;
  label: string;
};

interface ProfileTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const ProfileTabs = ({
  tabs,
  activeTab,
  onTabChange,
}: ProfileTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full pb-6">
      <TabsList className="">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.id} value={tab.id} className="cursor-pointer">
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
