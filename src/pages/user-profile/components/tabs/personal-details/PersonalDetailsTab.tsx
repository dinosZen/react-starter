import { ContactsPanel } from "./panels/ContactsPanel";
import { PersonalInfoPanel } from "./panels/PersonalInfoPanel";
import { UserSettingsPanel } from "./panels/UserSettingsPanel";
import {
  type ContactItem,
  type PersonalInfoItem,
  type UserSettingsItem,
} from "@/types/user";

export function PersonalDetailsTab({
  personalInfoData,
  contactsData,
  settingsData,
}: Readonly<{
  personalInfoData: PersonalInfoItem[];
  contactsData: ContactItem[];
  settingsData: UserSettingsItem[];
}>) {
  return (
    <div className="flex flex-col gap-6">
      <PersonalInfoPanel items={personalInfoData} hasCopyButton />
      <ContactsPanel items={contactsData} />
      <UserSettingsPanel items={settingsData} />
    </div>
  );
}
