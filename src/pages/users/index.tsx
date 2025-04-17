import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { DataTable } from "./components/DataTable";
import { useTranslation } from "react-i18next";
import { useUsersColumns } from "./table-columns/UsersColumns";
import { queryClient } from "@/lib/react-query";

import { usersTableMockData } from "@/lib/constants";

function Settings() {
  const getUsersColumns = useUsersColumns();
  const usersColumns = getUsersColumns();
  const { t } = useTranslation();

  //   const {
  //     data: listOfAgents,
  //     isLoading: isLoadingAgents,
  //     isFetching,
  //   } = useAgents();

  // const isLoading = isLoadingAgents || isFetching;

  const handlePaginationChange = (nextPage: number, nextSize: number) => {
    // Re-fetch from your API with new page/size:
    // e.g. set some state or use router push to query param
    // or call your query function again
    queryClient.invalidateQueries({ queryKey: ["agents"] });
    // or use a function to update the page and size
  };
  return (
    <>
      <section className="flex flex-row items-center justify-between border-b border-b-slate-200 p-6">
        <header>
          <h1 className="text-3xl font-bold pb-3">Users</h1>
          <p>Manage your account settings and set e-mail preferences.</p>
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
      <section className="w-full p-6">
        <DataTable
          columns={usersColumns}
          data={usersTableMockData}
          //isLoading={isLoading}
          //onPaginationChange={handlePaginationChange}
          //   paginationData={{
          //     page: listOfAgents?.data?.data.page ?? 0,
          //     size: listOfAgents?.data?.data.size ?? 10,
          //     total: listOfAgents?.data?.data.total ?? 1,
          //   }}
        />
      </section>
    </>
  );
}

export default Settings;
