// export interface User {
//   id: number;
//   name: string;
//   email: string;
//   status?: string;
//   createdAt: string;
// }
export interface ContactItem {
  label: string;
  values: string[];
}

export interface PersonalInfoItem {
  label: string;
  value: string;
}

export interface UserSettingsItem {
  label: string;
  value: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  status?: string;
  createdAt: string;
  contactsData?: ContactItem[];
  personalInfoData?: PersonalInfoItem[];
  settingsData?: UserSettingsItem[];
}
