import { verificationAndSecurityData } from "@/types/user";

interface verificationAndSecurityProps {
  verificationAndSecurity: verificationAndSecurityData;
}

export const VerificationAndSecurityPanel = ({
  verificationAndSecurity,
}: verificationAndSecurityProps) => {
  return (
    <div className="bg-background-primary-default border-1 border-border-primary-default p-8 rounded-md h-full">
      <h2 className="text-xl font-bold mb-6">Verification and Security</h2>
      <div className="space-y-5"></div>
    </div>
  );
};
