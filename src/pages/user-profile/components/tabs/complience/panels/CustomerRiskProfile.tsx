import { customerRiskProfileData } from "@/types/user";

interface customerRiskProfileProps {
  customerRiskProfile: customerRiskProfileData;
}

export const CustomerRiskProfilePanel = ({
  customerRiskProfile,
}: customerRiskProfileProps) => {
  return (
    <div className="bg-background-primary-default border-1 border-border-primary-default p-8 rounded-md h-full">
      <h2 className="text-xl font-bold mb-6">Customer Risk Profil</h2>
      <div className="space-y-5">
        <div className="grid grid-cols-[4fr_8fr] gap-4">
          <div className="text-text-secondary-default text-sm">Risk Level</div>
          <div className="text-left">
            <div className="text-sm">{customerRiskProfile.riskLevel}</div>
          </div>
        </div>
        <div className="grid grid-cols-[4fr_8fr] gap-4">
          <div className="text-text-secondary-default text-sm">Risk Score</div>
          <div className="text-left">
            <div className="text-sm">{customerRiskProfile.riskScore}</div>
          </div>
        </div>
        <div className="grid grid-cols-[4fr_8fr] gap-4">
          <div className="text-text-secondary-default text-sm">
            Sanctions Screening
          </div>
          <div className="text-left">
            <div className="text-sm">
              {customerRiskProfile.sanctionsScreening.clear
                ? "Clear"
                : "Failed"}{" "}
              {customerRiskProfile.sanctionsScreening.checkData}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-[4fr_8fr] gap-4">
          <div className="text-text-secondary-default text-sm">
            KYC questionnare
          </div>
          <div className="text-left">
            <div className="text-sm">
              {customerRiskProfile.kycQuestionnare ? "Completed" : "Failed"}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-[4fr_8fr] gap-4">
          <div className="text-text-secondary-default text-sm">VPN Usage</div>
          <div className="text-left">
            <div className="text-sm">{customerRiskProfile.vpnUsage}</div>
          </div>
        </div>
        <div className="grid grid-cols-[4fr_8fr] gap-4">
          <div className="text-text-secondary-default text-sm">
            IP Adresses Used
          </div>
          <div className="text-left">
            <div className="text-sm">{customerRiskProfile.ipAdressUsed}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
