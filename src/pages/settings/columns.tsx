import { ColumnDef } from "@tanstack/react-table";
import { Agent } from "@/types/agent";
import { Pencil, Trash2, ArrowUpDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
// import {
//   deleteAction,
//   deactivateAction,
// } from "../api/apiMethod";
// import { ActionsCell } from "@/components/ui/table-action-cell";
// import { DeactivateMethodLeader } from "@/components/ui/change-method-leader-modal";

export const useAgentColumns = (): (() => ColumnDef<Agent>[]) => {
  const { t } = useTranslation();

  return () => [
    {
      accessorKey: "name",
      header: t("agentsTable.name"),
      cell: ({ row }) => {
        const agent = row.original;

        return agent.status === "pending" ? (
          <span className="text-gray-500">-</span>
        ) : (
          <Link
            to={`/agents/${agent.id}`}
            onClick={(e) => e.stopPropagation()}
            className="text-dark-blue"
          >
            {agent.name}
          </Link>
        );
      },
    },
    {
      accessorKey: "email",
      header: t("agentsTable.email"),
      size: 170,
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
            {t("agentsTable.role")}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "status",
      size: 100,
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="cursor-pointer text-left !p-0"
          >
            {t("agentsTable.status")}
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

        const statusText = t(`agentsTable.${status}`);

        return (
          <span className={`px-2 py-1 text:opacity:50 ${statusClass}`}>
            {statusText}
          </span>
        );
      },
    },
    {
      accessorKey: "actions",
      header: t("agentsTable.actions"),
      size: 260,
      cell: ({ row }) => {
        const agent = row.original;

        return (
          <div className="flex space-x-2">
            <Link
              to={`/agents/${agent.id}`}
              onClick={(e) => e.stopPropagation()}
              className="flex text-dark-blue"
            >
              <Pencil className="h-4 w-4 mr-1" />
              {/* {t("edit")} */}
            </Link>
            <span>
              <Trash2
                className="h-4 w-4 text-red-500 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  // deleteAction(agent.id);
                }}
              />
            </span>
            {/* <ActionsCell<MethodLeader>
              row={row}
              onDelete={deleteMethodLeader}
              role="methodLeader"
            /> */}
            {/* {agent.has_clients && (
              <DeactivateAgent<Agent>
                row={row}
                onSubmit={(id, data) => deactivateAgent(id, data)}
              />
            )} */}
          </div>
        );
      },
    },
  ];
};
