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

export interface customerRiskProfileData {
  riskLevel: string;
  riskScore: string;
  sanctionsScreening: {
    clear: boolean;
    checkData: string;
  };
  kycQuestionnare: boolean;
  vpnUsage: string;
  ipAdressUsed: string;
}

export interface monthlyActivityOverviewData {
  monthlyIncomingVolume: string;
  monthlyOutgoingVolume: string;
  monthlyExchangeVolume: string;
  monthlyWalletTransactions: string;
  monthlyExchangeTransactions: string;
}

export interface accountPurposeAndSourceOfFundsData {
  accountPurpose: string;
  sourceOfFunds: string;
  employmentStatus: string;
}

export interface verificationAndSecurityData {
  verificationStatus: string;
  verificationLevel: string;
  twoFaEnabled: boolean;
}

export interface accountStateData {
  state: string;
  reason: string;
}

export interface latestActionsDataItem {
  action: string;
  status: string;
  addedOn: string;
}

export interface ComplianceData {
  customerRiskProfile: customerRiskProfileData;
  monthlyActivityOverview: monthlyActivityOverviewData;
  accountPurposeAndSourceOfFunds: accountPurposeAndSourceOfFundsData;
  verificationAndSecurity: verificationAndSecurityData;
  accountState: accountStateData;
  latestActions: latestActionsDataItem[];
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
  complianceData?: ComplianceData;
  settingsData?: UserSettingsItem[];
}
