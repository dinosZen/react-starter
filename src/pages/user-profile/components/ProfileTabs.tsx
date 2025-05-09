import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from "@/types/user";
import { ComplienceTab } from "./tabs/complience/ComplienceTab";
import { FinancialDetailsTab } from "./tabs/financial-details/FinancialDetailsTab";
import { PersonalDetailsTab } from "./tabs/personal-details/PersonalDetailsTab";

export type TabItem = {
  id: string;
  label: string;
};

interface ProfileTabsProps {
  tabs: TabItem[];
  activeTab: string;
  userData: User;
  onTabChange: (tabId: string) => void;
}

export const ProfileTabs = ({
  tabs,
  activeTab,
  onTabChange,
  userData,
}: ProfileTabsProps) => {
  return (
    <Tabs
      value={activeTab}
      onValueChange={onTabChange}
      className="w-full gap-0"
    >
      <TabsList className="my-6">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.id} value={tab.id} className="cursor-pointer">
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {!userData ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-text-secondary-default text-lg">
            No user data available!
          </p>
        </div>
      ) : (
        <div>
          <TabsContent value="personal">
            {userData?.contactsData?.length === 0 &&
            userData?.personalInfoData?.length === 0 &&
            userData?.settingsData?.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-text-secondary-default text-lg">
                  No personal details available!
                </p>
              </div>
            ) : (
              <PersonalDetailsTab
                personalInfoData={userData?.personalInfoData || []}
                contactsData={userData?.contactsData || []}
                settingsData={userData?.settingsData || []}
              />
            )}
          </TabsContent>
          <TabsContent value="financial">
            {!userData?.financialDetailsData ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-text-secondary-default text-lg">
                  No financial details available!
                </p>
              </div>
            ) : (
              <FinancialDetailsTab
                financialDetailsData={userData?.financialDetailsData}
              />
            )}
          </TabsContent>
          <TabsContent value="compliance">
            {!userData?.complianceData ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-text-secondary-default text-lg">
                  No compliance details available!
                </p>
              </div>
            ) : (
              <ComplienceTab compliancesData={userData?.complianceData} />
            )}
          </TabsContent>
          <TabsContent value="documents">Documents...</TabsContent>
          <TabsContent value="wallets">Wallets...</TabsContent>
          <TabsContent value="legal">Legal...</TabsContent>
          <TabsContent value="identification">Identification...</TabsContent>
          <TabsContent value="activity">Activity...</TabsContent>
        </div>
      )}
    </Tabs>
  );
};
