import { accountPurposeAndSourceOfFundsData } from "@/types/user";

interface accountPurposeAndSourceOfFundsProps {
  accountPurposeAndSourceOfFounds: accountPurposeAndSourceOfFundsData;
}

export const AccountPurposeAndSourceOfFundsPanel = ({
  accountPurposeAndSourceOfFounds,
}: accountPurposeAndSourceOfFundsProps) => {
  return (
    <div className="bg-background-primary-default border-1 border-border-primary-default p-8 rounded-md h-full">
      <h2 className="text-xl font-bold mb-6">
        Account Purpose And Source Of Founds
      </h2>
      <div className="space-y-5"></div>
    </div>
  );
};
