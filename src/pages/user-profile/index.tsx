import { useState } from "react";
import { ProfileHeader } from "./components/ProfileHeader";
import { ProfileTabs } from "./components/ProfileTabs";

import { userProfileTabs, userProfileMockData } from "@/constants/settings";

const UserDetails = () => {
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
          userData={userProfileMockData}
          tabs={userProfileTabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </div>
    </section>
  );
};

export default UserDetails;
