import { latestActionsDataItem } from "@/types/user";

interface latestActionsProps {
  latestActions: latestActionsDataItem[];
}

export const LatestActionsPanel = ({ latestActions }: latestActionsProps) => {
  return (
    <div className="bg-background-primary-default border-1 border-border-primary-default p-8 rounded-md h-full">
      <h2 className="text-xl font-bold mb-6">Latest Actions</h2>
      <div className="space-y-5"></div>
    </div>
  );
};
