import { Badge } from "@/components/ui/badge";
import { memo } from "react";

const STATUS_STYLES = {
  Active: "bg-green-700 text-green-300",
  Inactive: "bg-red-700 text-red-300",
  Pending: "bg-yellow-700 text-yellow-300",
  Unknown: "bg-gray-700 text-gray-300",
} as const;

type StatusType = keyof typeof STATUS_STYLES;

interface StatusBadgeProps {
  status: string;
}

function RawStatusBadge({ status }: Readonly<StatusBadgeProps>) {
  const safeStatus: StatusType =
    status in STATUS_STYLES ? (status as StatusType) : "Unknown";

  return (
    <Badge className={`border-none ${STATUS_STYLES[safeStatus]}`}>
      {safeStatus}
    </Badge>
  );
}

export const StatusBadge = memo(RawStatusBadge);
