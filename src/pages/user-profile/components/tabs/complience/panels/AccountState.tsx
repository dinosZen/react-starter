import { accountStateData } from "@/types/user";

interface accountStateProps {
  accountState: accountStateData;
}

export const AccountStatePanel = ({ accountState }: accountStateProps) => {
  return (
    <div className="bg-background-primary-default border-1 border-border-primary-default p-8 rounded-md h-full">
      <h2 className="text-xl font-bold mb-6">Account State</h2>
      <div className="space-y-5"></div>
    </div>
  );
};
