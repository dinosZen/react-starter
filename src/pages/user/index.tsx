import { useState } from "react";
import { ProfileHeader } from "./components/ProfileHeader";
import { ProfileTabs, type TabItem } from "./components/ProfileTabs";
import {
  PersonalInfoPanel,
  type PersonalInfoItem,
} from "./components/PersonalInfoPanel";
import { ContactsPanel, type ContactItem } from "./components/ContactsPanel";

// Mock data
const profileTabs: TabItem[] = [
  { id: "personal", label: "Personal details" },
  { id: "financial", label: "Financial details" },
  { id: "compliance", label: "Compliance" },
  { id: "documents", label: "Documents" },
  { id: "wallets", label: "Wallets" },
  { id: "legal", label: "Legal agreements" },
  { id: "identification", label: "Identification results" },
  { id: "activity", label: "Activity" },
];

const personalInfoData: PersonalInfoItem[] = [
  { label: "Unique Public ID", value: "AA87 N84G VYTI 72WI" },
  { label: "Name", value: "Bob Johnson" },
  { label: "Birthdate", value: "17/04/1987" },
  { label: "Nationality", value: "Bosnia and Herzegovina" },
  { label: "Language", value: "English" },
  { label: "Created by", value: "Robby Keane" },
  { label: "Created at", value: "02 Feb 2024" },
  { label: "Last updated at", value: "17 Apr 2025 - 13:26 CET" },
];

const contactsData: ContactItem[] = [
  {
    label: "Primary email",
    values: ["bob@example.com"],
  },
  {
    label: "Emails",
    values: ["bob1@example.com", "bob2@example.com"],
  },
  {
    label: "Primary phone",
    values: ["+46 70 123 45 67"],
  },
  {
    label: "Phone numbers",
    values: ["+46 73 234 56 78", "+46 76 345 67 89"],
  },
  {
    label: "Full legal address",
    values: ["123 Elm Street", "Stockholm", "Sweden"],
  },
];

const User = () => {
  const [activeTab, setActiveTab] = useState("personal");

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const profileImage =
    "https://s3-alpha-sig.figma.com/img/7d5d/d433/2b64d4d956d2ea075047f206fee4f474?Expires=1746403200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Zc2bYGsuQrZoK3l7TTY47QH5k5lbpK9yBsCvJnrDHsOuHRIAfjWW6RZY3ScQRsxT586zptkulHncGXsMqmFvkrSIywAwTXyS2PP8dm-VNhB4m3RirsbwY6qzFhR3OPJ1QTGOHPVJOVymQim4b~dKlLhFJCMJwLgdFKeeNJcOrG5qpbDVOge7fyCknetFyFHmi9Q~3uhC-ydM7l4cBGb8DRtL5WYNUkGaMDYJtQw0Odr-IBfISRLUhNCKkV0x1KXo~WRPXA-afLeyzmBw~AhFt3svCPl7wBQPw1ZMENuYUdgwcH-CqeiIF1QB9bWk96GconDRmCB7JFoPSSv-v8wXKg__";

  return (
    <section className="w-full relative">
      <div className="absolute top-0 left-0 w-full h-25 bg-gradient-to-r from-amber-300 via-blue-400 to-purple-600 opacity-60"></div>
      <div className="p-6 pt-8">
        <ProfileHeader
          name="Bob Johnson"
          profileImage={profileImage}
          isVerified={true}
        />
        <ProfileTabs
          tabs={profileTabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
        <div className="flex-1">
          {activeTab === "personal" && (
            <div className="grid grid-cols-1 md:grid-cols-[8fr_4fr] gap-8">
              <PersonalInfoPanel
                items={personalInfoData}
                hasCopyButton={true}
              />
              <ContactsPanel items={contactsData} />
            </div>
          )}
          {activeTab !== "personal" && (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">
                Content for{" "}
                {profileTabs.find((tab) => tab.id === activeTab)?.label} will be
                displayed here.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default User;
