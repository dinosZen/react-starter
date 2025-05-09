import { monthlyActivityOverviewData } from "@/types/user";

interface monthlyActivityOverviewProps {
  monthlyActivitiesOverview: monthlyActivityOverviewData;
}

export const MonthlyActivitiesOverviewPanel = ({
  monthlyActivitiesOverview,
}: monthlyActivityOverviewProps) => {
  return (
    <div className="bg-background-primary-default border-1 border-border-primary-default p-8 rounded-md h-full">
      <h2 className="text-xl font-bold mb-6">Monthly Activity Overview</h2>
      <div className="space-y-5"></div>
    </div>
  );
};
