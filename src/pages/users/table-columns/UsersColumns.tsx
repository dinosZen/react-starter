import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types/user";
import { ArrowUpDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";

export const useUsersColumns = (): (() => ColumnDef<User>[]) => {
  const { t } = useTranslation();

  return () => [
    {
      id: "select",
      size: 20,
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="ml-2 border-1 border-background-brand-default"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          className="ml-2 border-1 border-background-brand-default"
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: t("agent.name"),
      cell: ({ row }) => {
        const user = row.original;

        return (
          <span className="flex flex-col">
            <span className="">{user.name}</span>
            <span className="text-text-secondary-default text-sm">
              User ID: {user.id}
            </span>
          </span>
        );
      },
    },
    {
      accessorKey: "email",
      header: t("agent.email"),
      cell: ({ row }) => {
        const user = row.original;
        //cut the email if it's longer than 20 characters and add "..."
        if ((user.email ?? "").length > 20) {
          return <span>{(user.email?.substring(0, 20) ?? "") + "..."}</span>;
        } else {
          return <span>{user.email}</span>;
        }
      },
    },
    {
      accessorKey: "createdAt",
      header: t("agent.createdAt"),
      cell: ({ row }) => {
        const user = row.original;
        const date = new Date(user.createdAt);

        const options: Intl.DateTimeFormatOptions = {
          year: "numeric",
          month: "long",
          day: "2-digit",
        };
        const formattedDate = date.toLocaleDateString("en-US", options);
        return <span>Created on {formattedDate}</span>;
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
      size: 40,
      cell: ({ row }) => {
        const user = row.original;

        return (
          <span className="w-full flex items-center justify-end">
            <Button
              variant="outline"
              className="px-4 mr-2 !hover:bg-background transition duration-300 ease-in-out"
            >
              <Link to={`/users/${user.id}`}>
                <span>View</span>
              </Link>
            </Button>
          </span>
        );
      },
    },
  ];
};
