import { Button } from "@/components/ui/button";
import { Agent } from "@/types/agent";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  MoreVertical,
  Pencil,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

type GetAgentsColumnsProps = {
  onDeleteClick: (agent: Agent) => void;
  onManageRoleClick: (agent: Agent) => void;
};

export const useRoleColumns = ({
  onDeleteClick,
  onManageRoleClick,
}: GetAgentsColumnsProps): (() => ColumnDef<Agent>[]) => {
  const { t } = useTranslation();

  return () => [
    {
      accessorKey: "role",
      size: 100,
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
        const role = row.original;

        return <span>{role.title}</span>;
      },
    },
    {
      accessorKey: "permissions",
      header: t("agent.permissions"),
      cell: ({ row }) => {
        const role = row.original;

        return (
          <span>
            {role.permissions.map((permission) => (
              <Badge key={permission} className="mr-1 mb-1 text-xs">
                {permission.title}
              </Badge>
            ))}
            {/* {(agent.permissions ?? []).length > 0 ? (
              (agent.permissions ?? []).length
            ) : (
              <span className="text-gray-500">-</span>
            )} */}
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
              >
                <Pencil className="h-7 w-10" /> Edit agent role
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDeleteClick(agent)}
                className="cursor-pointer hover:bg-background-secondary-default"
              >
                <Trash2 /> Delete agent
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};
