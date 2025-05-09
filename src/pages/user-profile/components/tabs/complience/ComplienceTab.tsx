import { ComplianceData } from "@/types/user";
import { AccountPurposeAndSourceOfFundsPanel } from "./panels/AccountPurposeAndSourceOfFunds";
import { AccountStatePanel } from "./panels/AccountState";
import { CustomerRiskProfilePanel } from "./panels/CustomerRiskProfile";
import { LatestActionsPanel } from "./panels/LatestActions";
import { MonthlyActivitiesOverviewPanel } from "./panels/MonthlyActivityOverview";
import { VerificationAndSecurityPanel } from "./panels/VerificationAndSecurity";

export function ComplienceTab({
  compliancesData,
}: Readonly<{
  compliancesData: ComplianceData;
}>) {
  return (
    <div className="flex flex-col gap-6">
      <CustomerRiskProfilePanel
        customerRiskProfile={compliancesData.customerRiskProfile}
      />
      <MonthlyActivitiesOverviewPanel
        monthlyActivitiesOverview={compliancesData.monthlyActivityOverview}
      />
      <AccountPurposeAndSourceOfFundsPanel
        accountPurposeAndSourceOfFounds={
          compliancesData.accountPurposeAndSourceOfFunds
        }
      />
      <VerificationAndSecurityPanel
        verificationAndSecurity={compliancesData.verificationAndSecurity}
      />
      <AccountStatePanel accountState={compliancesData.accountState} />
      <LatestActionsPanel latestActions={compliancesData.latestActions} />
    </div>
  );
}
