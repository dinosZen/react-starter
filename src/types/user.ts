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

export interface PaymentMethodsItem {
  type: string;
  provider: string;
  details: string;
  status: string;
  addedOn: string;
}

export interface BeneficiariesItem {
  name: string;
  type: string;
  details: string;
  verified: boolean;
  addedOn: string;
}
export interface FeesStructureItem {
  feeType: string;
  value: string;
  effectiveSince: string;
}
export interface LimitsItem {
  limitType: string;
  value: string;
  scope: string;
}

export interface FinancialDetailsData {
  paymentMethods: PaymentMethodsItem[];
  beneficiaries: BeneficiariesItem[];
  feesStructure: FeesStructureItem[];
  limits: LimitsItem[];
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
  financialDetailsData?: FinancialDetailsData;
  settingsData?: UserSettingsItem[];
}
