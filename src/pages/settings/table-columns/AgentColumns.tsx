import { Button } from "@/components/ui/button";
import { Agent } from "@/types/agent";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  MoreVertical,
  Pencil,
  PowerOff,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type GetAgentsColumnsProps = {
  onDeleteClick: (agent: Agent) => void;
  onManageRoleClick: (agent: Agent) => void;
};

export const useAgentColumns = ({
  onDeleteClick,
  onManageRoleClick,
}: GetAgentsColumnsProps): (() => ColumnDef<Agent>[]) => {
  const { t } = useTranslation();

  return () => [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting()}
            className="cursor-pointer text-left !p-0"
          >
            {t("agent.name")}
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
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
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting()}
            className="cursor-pointer text-left !p-0"
          >
            {t("agent.email")}
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
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
            onClick={() => column.toggleSorting()}
            className="cursor-pointer text-left !p-0"
          >
            {t("agent.role")}
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
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
          case "inactive":
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
      id: "actions",
      header: "",
      size: 50,
      cell: ({ row }) => {
        const agent = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex ml-auto !p-[1rem] data-[state=open]:!bg-background-secondary-default"
              >
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-8 w-8" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-background-primary-default w-[200px] border border-border-secondary-default rounded-md shadow-lg"
            >
              <DropdownMenuItem
                onClick={() => onManageRoleClick(agent)}
                className="cursor-pointer hover:bg-background-secondary-default"
              >
                <Pencil className="h-7 w-10" /> Edit agent role
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDeleteClick(agent)}
                className="cursor-pointer hover:bg-background-secondary-default"
              >
                <Trash2 /> Delete agent
              </DropdownMenuItem>
              <DropdownMenuItem
                //onClick={() => onDeleteClick(agent)}
                className="cursor-pointer hover:bg-background-secondary-default"
              >
                <PowerOff /> Deactivate
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};
