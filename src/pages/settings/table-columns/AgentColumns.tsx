import { ColumnDef } from "@tanstack/react-table";
import { Agent } from "@/types/agent";
import { ArrowUpDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { ManageRoleDialog } from "../components/ManageRoleDialog";
import { DeleteAgentDialog } from "../components/DeleteAgentDialog";

export const useAgentColumns = (): (() => ColumnDef<Agent>[]) => {
  const { t } = useTranslation();

  const [editRowId, setEditRowId] = useState<string | number | null>(null);

  return () => [
    {
      accessorKey: "name",
      header: t("agent.name"),
      cell: ({ row }) => {
        const agent = row.original;

        return agent.status?.toLowerCase() === "pending" ? (
          <span className="text-gray-500">-</span>
        ) : (
          <span className="opacity-">
            {agent.firstName} {agent.lastName}
          </span>
        );
      },
    },
    {
      accessorKey: "email",
      header: t("agent.email"),
      cell: ({ row }) => {
        const agent = row.original;
        //cut the email if it's longer than 20 characters and add "..."
        if ((agent.email ?? "").length > 20) {
          return <span>{(agent.email?.substring(0, 20) ?? "") + "..."}</span>;
        } else {
          return <span>{agent.email}</span>;
        }
      },
    },
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
      cell: ({ row }) => {
        const agent = row.original;
        const agentRole = agent.role ? agent.role.title : "-";
        return <span>{agentRole}</span>;
      },
    },
    {
      accessorKey: "permissions",
      maxSize: 150,
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
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="cursor-pointer text-left !p-0"
          >
            {t("agent.status")}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const agent = row.original;
        const status = agent?.status?.toLowerCase();
        let statusClass = "";

        // Determine the CSS class based on the status
        switch (status) {
          case "pending":
            statusClass = "bg-blue";
            break;
          case "active":
            statusClass = "bg-green";
            break;
          case "suspended":
            statusClass = "bg-orange";
            break;
          case "revoked":
            statusClass = "bg-red";
            break;
          case "expired":
            statusClass = "bg-gray";
            break;
          default:
            statusClass = "bg-yellow"; // Default color if none of the specified statuses match
        }

        const statusText = t(`agent.${status}`);

        return (
          <span className={`px-2 py-1 text:opacity:50 ${statusClass}`}>
            {statusText}
          </span>
        );
      },
    },
    {
      accessorKey: "actions",
      header: "",
      cell: ({ row }) => {
        const agent = row.original;
        const isEditing = editRowId === agent.id;

        return (
          <div className="flex justify-end space-x-3 mr-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="!hover:bg-background transition duration-300 ease-in-out"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditRowId((current) =>
                        current === agent.id ? null : agent.id
                      );
                    }}
                  >
                    <ManageRoleDialog open={isEditing} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit agent</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DeleteAgentDialog agent={agent} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete agent</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        );
      },
    },
  ];
};
