import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Agent } from "@/types/agent";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { DeleteAgentDialog } from "../components/DeleteAgentDialog";

export const useRoleColumns = (): (() => ColumnDef<Agent>[]) => {
  const { t } = useTranslation();

  return () => [
    {
      accessorKey: "role",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="cursor-pointer text-left !p-0"
          >
            {t("agent.role")}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "permissions",
      header: t("agent.permissions"),
      cell: ({ row }) => {
        const agent = row.original;
        return (
          <span>
            {(agent.permissions ?? []).length > 0 ? (
              (agent.permissions ?? []).length
            ) : (
              <span className="text-gray-500">-</span>
            )}
          </span>
        );
      },
    },
    {
      accessorKey: "actions",
      header: "",
      cell: ({ row }) => {
        const agent = row.original;

        return (
          <div className="flex justify-end space-x-3 mr-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>icon</TooltipTrigger>
                <TooltipContent className="bg-background-primary-default text-text-primary-default">
                  <p>Edit role</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DeleteAgentDialog agent={agent} />
          </div>
        );
      },
    },
  ];
};
