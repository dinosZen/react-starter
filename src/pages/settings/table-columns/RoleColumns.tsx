import { Button } from "@/components/ui/button";
import { Role } from "@/features/settings/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown, Pencil } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type GetRolesColumnsProps = {
  onDeleteClick: (role: Role) => void;
  onManageRoleClick: (role: Role) => void;
};

const extractGroupsFromRole = (role: Role) => {
  // Map to hold unique groups by ID (prevents duplicates)
  const uniqueGroups = new Map();
  // Check if role and permissions exist
  if (!role || !Array.isArray(role.permissions)) {
    return [];
  }
  // Process each permission in the role
  role.permissions.forEach((permission) => {
    // Check if the permission has a group
    if (permission && permission.group) {
      const { id, title } = permission.group;
      // Add to our map if not already there (ensures no duplicates)
      if (!uniqueGroups.has(id)) {
        uniqueGroups.set(id, { id, title });
      }
    }
  });

  // Convert map values to array
  return Array.from(uniqueGroups.values());
};

export const useRoleColumns = ({
  onDeleteClick,
  onManageRoleClick,
}: GetRolesColumnsProps): (() => ColumnDef<Role>[]) => {
  const { t } = useTranslation();

  return () => [
    {
      accessorKey: "title",
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
      header: t("agent.premissions-group"),
      cell: ({ row }) => {
        const role = extractGroupsFromRole(row.original);

        //console.log("role", role);

        return role.length > 0 ? (
          role.map((group) => (
            <span key={group.id}>
              <Badge className="mr-1 mb-1 text-xs">{group.title}</Badge>
            </span>
          ))
        ) : (
          <span className="text-text-secondary-default">
            {t("agent.no-permissions")}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "",
      size: 50,
      cell: ({ row }) => {
        const role = row.original;

        return (
          <>
            <div className="flex items-center justify-end gap-2">
              <Button
                variant="outline"
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => onManageRoleClick(role)}
              >
                <Pencil className="h-4 w-4" />
                {/* {t("edit")} */}
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => onDeleteClick(role)}
              >
                <Trash2 className="h-4 w-4" />
                {/* {t("delete")} */}
              </Button>
            </div>
          </>
        );
      },
    },
  ];
};
