import { Input } from "@/components/ui/input";
import { FileDown, Funnel, Search } from "lucide-react";
import { DataTable } from "./components/DataTable";
import { useTranslation } from "react-i18next";
import { useUsersColumns } from "./table-columns/UsersColumns";
import { queryClient } from "@/lib/react-query";
import { useSearchParams } from "react-router-dom";
import { useAgents, AgentsQueryParams } from "./api/getUsers";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { usersTableMockData } from "@/lib/constants";

function Settings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const getUsersColumns = useUsersColumns();
  const usersColumns = getUsersColumns();
  const { t } = useTranslation();

  const getNum = (key: string, fallback: number) =>
    Number(searchParams.get(key) ?? fallback);

  const params: AgentsQueryParams = {
    page: getNum("page", 1),
    size: getNum("size", 10),
    search: searchParams.get("search") ?? "",
    orderBy: searchParams.get("orderBy") ?? "role",
    order: (searchParams.get("order") as "ASC" | "DESC") ?? "DESC",
  };

  //   const {
  //     data: listOfAgents,
  //     isLoading: isLoadingAgents,
  //     isFetching,
  //   } = useAgents();

  // const isLoading = isLoadingAgents || isFetching;

  const updateParams = (updates: Partial<AgentsQueryParams>) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([k, v]) => {
      if (v == null || v === "" || (typeof v === "number" && isNaN(v))) {
        next.delete(k);
      } else {
        next.set(k, String(v));
      }
    });

    if (
      updates.search != null ||
      updates.orderBy != null ||
      updates.order != null
    ) {
      next.set("page", "1");
    }
    setSearchParams(next, { replace: true });
  };

  const handlePaginationChange = (newPage: number, newSize: number) => {
    updateParams({ page: newPage, size: newSize });
  };
  const handleSearch = (q: string) => {
    updateParams({ search: q });
  };

  const totalPages = 1;

  return (
    <>
      <section className="flex flex-row items-center justify-between border-b-2 border-border-primary-default p-6">
        <header>
          <h1 className="text-3xl font-bold pb-3">Users</h1>
          <p className="text-text-secondary-default">
            Manage your account settings and set e-mail preferences.
          </p>
        </header>
        <div
          className="grid w-full max-w-sm items-center gap-1.5 relative"
          role="search"
        >
          <div className="relative">
            <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
              <Search className="h-4 w-4" aria-hidden="true" />
            </div>
            <Input
              id="search"
              type="search"
              placeholder={t("searchPlaceholder")}
              className="w-full rounded-lg bg-background pl-8"
            />
          </div>
        </div>
      </section>
      <section className="w-full p-6 pb-0">
        <div className="flex flex-row w-full items-center justify-between gap-6 relative">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="!bg-background-primary-default !hover:bg-background-secondary-default transition duration-300 ease-in-out"
                onClick={() => {}}
              >
                <Funnel className="h-4 w-4" /> Filters
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              side="bottom"
              sideOffset={5}
              className="bg-background-primary-default"
            >
              <DropdownMenuLabel>Status</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border-primary-default" />
              <DropdownMenuItem>Pending</DropdownMenuItem>
              <DropdownMenuItem>Active</DropdownMenuItem>
              <DropdownMenuItem>Expired</DropdownMenuItem>
              <DropdownMenuItem>Suspended</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="outline"
            className="!bg-background-primary-default !hover:bg-background-secondary-default transition duration-300 ease-in-out"
            onClick={() => {}}
          >
            <FileDown className="h-4 w-4" /> Export CSV
          </Button>
        </div>
      </section>
      <section className="w-full p-6">
        <DataTable
          columns={usersColumns}
          data={usersTableMockData}
          //isLoading={isLoading}
          onPaginationChange={handlePaginationChange}
          paginationData={{
            page: params.page,
            size: params.size,
            total: totalPages ?? 1,
          }}
        />
      </section>
    </>
  );
}

export default Settings;
