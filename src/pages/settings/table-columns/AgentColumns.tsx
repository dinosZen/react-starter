import { ColumnDef } from "@tanstack/react-table";
import { Agent } from "@/types/agent";
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
          <span className="ml-2 text-gray-500">-</span>
        ) : (
          <span className="ml-2">
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
      header: t("agent.role"),
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
      header: t("agent.status"),
      cell: ({ row }) => {
        const agent = row.original;
        const status = agent?.status?.toLowerCase();
        let statusClass = "";

        // Determine the CSS class based on the status
        switch (status) {
          case "pending":
            statusClass = "bg-blue-700 text-blue-300";
            break;
          case "active":
            statusClass = "bg-green-700 text-green-300";
            break;
          case "suspended":
            statusClass = "bg-orange-700 text-orange-300";
            break;
          case "revoked":
            statusClass = "bg-red-700 text-red-300";
            break;
          case "expired":
            statusClass = "bg-gray-700 text-gray-300";
            break;
          default:
            statusClass = "bg-yellow-700 text-yellow-300"; // Default color if none of the specified statuses match
        }

        const statusText = t(`agent.${status}`);

        return (
          <span className={`px-3 py-1 font-semibold rounded-md ${statusClass}`}>
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
          <div className="flex justify-end space-x-3 mr-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="p-0 hover:bg-background-secondary-default transition duration-300 ease-in-out"
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
                <TooltipContent className="bg-background-primary-default text-text-primary-default">
                  <p>Edit agent</p>
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
