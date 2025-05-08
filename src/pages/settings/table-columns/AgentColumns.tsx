import { Button } from "@/components/ui/button";
import { Agent } from "@/types/agent";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  MoreVertical,
  Pencil,
  PowerIcon,
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/toast";
import { updateAgent } from "@/features/settings/api";
import { AgentPatchPayload } from "@/features/settings/types";

type GetAgentsColumnsProps = {
  onDeleteClick: (agent: Agent) => void;
  onManageRoleClick: (agent: Agent) => void;
  onStatusClick: (agent: Agent) => void;
};

export const useAgentColumns = ({
  onDeleteClick,
  onManageRoleClick,
  onStatusClick,
}: GetAgentsColumnsProps): (() => ColumnDef<Agent>[]) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  type UpdateAgentVars = {
    agentId: string;
    data: AgentPatchPayload;
  };

  const updateAgentMutation = useMutation<unknown, unknown, UpdateAgentVars>({
    mutationFn: ({ agentId, data }) => updateAgent({ agentId, data }),
    onSuccess: () => {
      toast.success(t("success"), {
        description: t("agent.status-successfully-updated"),
      });
      // refetch agents
      queryClient.invalidateQueries({ queryKey: ["agents"] });
    },
    onError: (err: unknown) => {
      console.error("Status change error", err);
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error(t("error"), {
          description: t("unknown-error"),
        });
      }
    },
  });

  return () => [
    {
      accessorKey: "firstName",
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

        return (
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
            {t("email")}
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
            {t("role")}
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
            <DropdownMenuTrigger asChild className="py-0 px-[1rem] h-7.5">
              <Button
                variant="outline"
                className="flex ml-auto data-[state=open]:!bg-background-secondary-default data-[state=open]:border-border-primary-hover hover:border-border-primary-hover"
              >
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-7 w-7" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-background-primary-default w-[200px] border border-border-secondary-default rounded-md shadow-lg"
            >
              <DropdownMenuItem
                onClick={() => onManageRoleClick(agent)}
                className="cursor-pointer hover:bg-background-secondary-default"
                disabled={
                  agent.status?.toLowerCase() ===
                  t("agent.pending").toLowerCase()
                }
              >
                <Pencil className="h-7 w-10" /> Edit agent role
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDeleteClick(agent)}
                className="cursor-pointer hover:bg-background-secondary-default"
              >
                <Trash2 /> Delete agent
              </DropdownMenuItem>
              {agent.status?.toLowerCase() ===
              t("agent.inactive").toLowerCase() ? (
                <DropdownMenuItem
                  onClick={() =>
                    updateAgentMutation.mutateAsync({
                      agentId: agent.id.toString(),
                      data: { status: "ACTIVE" },
                    })
                  }
                  className="cursor-pointer hover:bg-background-secondary-default"
                >
                  <PowerIcon className="h-7 w-10" /> {t("agent.activate")}
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={() => onStatusClick(agent)}
                  className="cursor-pointer hover:bg-background-secondary-default"
                  disabled={
                    agent.status?.toLowerCase() ===
                    t("agent.pending").toLowerCase()
                  }
                >
                  {agent.status?.toLowerCase() ===
                  t("agent.active").toLowerCase() ? (
                    <PowerOff className="h-7 w-10" />
                  ) : (
                    <PowerIcon className="h-7 w-10" />
                  )}{" "}
                  {agent.status?.toLowerCase() ===
                  t("agent.active").toLowerCase()
                    ? t("agent.deactivate")
                    : t("agent.activate")}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};
