import { useState } from "react";
import { SettingsTabs } from "./components/SettingsTabs";
import { settingsTabs } from "@/constants/settings";

function Settings() {
  const [activeTab, setActiveTab] = useState("agents");

  const handleTabChange = (tabId: string) => {
    //set the active tab
    setActiveTab(tabId);
  };

  return (
    <>
      <section className="flex flex-row items-center justify-between p-6 pb-2">
        <header>
          <h1 className="text-3xl font-bold pb-3">Settings</h1>
        </header>
      </section>
      <section className="w-full p-6">
        <SettingsTabs
          tabs={settingsTabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </section>
    </>
  );
}

export default Settings;
