import { ColumnDef } from "@tanstack/react-table";
import { Agent } from "@/types/agent";
import { Pencil, Trash2, ArrowUpDown, Check, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { agentRoleOptions } from "@/lib/constants";
import { ManageRoleDialog } from "../components/ManageRoleDialog";

export const useAgentColumns = (): (() => ColumnDef<Agent>[]) => {
  const { t } = useTranslation();

  const [editRowId, setEditRowId] = useState<string | number | null>(null);

  return () => [
    {
      accessorKey: "name",
      header: t("agent.name"),
      cell: ({ row }) => {
        const agent = row.original;

        return agent.status === "pending" ? (
          <span className="text-gray-500">-</span>
        ) : (
          <span>{agent.name}</span>
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
        const isEditing = editRowId === agent.id;

        if (!isEditing) {
          // Not in edit mode: just show the current role text
          return <span>{agent.role.label}</span>;
        }
        return (
          <Select
            defaultValue={agent.role.value}
            // onValueChange={(newValue) => {}}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              {agentRoleOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
              <Separator className="my-2" />
              <ManageRoleDialog />
            </SelectContent>
          </Select>
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
            {agent.permissions.length > 0 ? (
              agent.permissions.length
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
            {isEditing ? (
              <div className="flex space-x-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          // saveAction(agent.id, agent);
                          setEditRowId(null);
                        }}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Save changes</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditRowId(null);
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Discard changes</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            ) : (
              <>
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
                        <Pencil className="h-7 w-10" />
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
                      <Button
                        variant="outline"
                        size="icon"
                        className="!hover:bg-background transition duration-300 ease-in-out"
                        onClick={(e) => {
                          e.stopPropagation();
                          // deleteAction(agent.id);
                        }}
                      >
                        <Trash2 className="h-7 w-10" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete agent</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </>
            )}
          </div>
        );
      },
    },
  ];
};
