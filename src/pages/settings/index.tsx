import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Funnel, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { AgentsQueryParams, useAgents } from "./api/agent/getAgents";
import { AgentDialog } from "./components/AddNewAgentDialog";
import { DataTable } from "./components/DataTable";
import { useAgentColumns } from "./table-columns/AgentColumns";

function Settings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const getAgentsColumns = useAgentColumns();
  const agentsColumns = getAgentsColumns();
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

  const {
    data: listOfAgents,
    isLoading: isLoadingAgents,
    isFetching: isFetchingAgents,
  } = useAgents(params);

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

  const isLoading = isLoadingAgents || isFetchingAgents;

  return (
    <>
      <section className="flex flex-row items-center justify-between p-6">
        <header>
          <h1 className="text-3xl font-bold pb-3">Settings</h1>
        </header>
      </section>
      <section className="w-full p-6">
        <Tabs defaultValue="agents" className="w-full">
          <TabsList>
            <TabsTrigger value="agents" className="cursor-pointer">
              {t("settings.agents")}
            </TabsTrigger>
            <TabsTrigger value="roles" className="cursor-pointer">
              {t("settings.roles")}
            </TabsTrigger>
            <TabsTrigger value="notifications" className="cursor-pointer">
              {t("settings.notifications")}
            </TabsTrigger>
            <TabsTrigger value="support" className="cursor-pointer">
              {t("settings.supportHelp")}
            </TabsTrigger>
          </TabsList>
          <div className="flex flex-row items-center justify-between w-full py-4">
            <div
              className="flex flex-row w-full max-w-sm items-center gap-6 relative"
              role="search"
            >
              <div className="relative min-w-[20rem]">
                <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
                  <Search className="h-4 w-4" aria-hidden="true" />
                </div>
                <Input
                  id="search"
                  type="search"
                  placeholder={t("searchPlaceholder")}
                  className="w-full rounded-lg bg-background-primary-default pl-8 border-transparent"
                  value={params.search}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  {" "}
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
            </div>
            <AgentDialog />
          </div>
          <TabsContent value="agents">
            <DataTable
              columns={agentsColumns}
              data={listOfAgents?.data ?? []}
              isLoading={isLoading}
              //onSortChange={handleSort}
              onPaginationChange={handlePaginationChange}
              paginationData={{
                page: params.page,
                size: params.size,
                total: listOfAgents?.totalPages ?? 1,
              }}
            />
          </TabsContent>
          <TabsContent value="roles">
            <DataTable
              columns={agentsColumns}
              data={listOfAgents?.data ?? []}
              isLoading={isLoading}
              //onSortChange={handleSort}
              onPaginationChange={handlePaginationChange}
              paginationData={{
                page: params.page,
                size: params.size,
                total: listOfAgents?.totalPages ?? 1,
              }}
            />
          </TabsContent>
          <TabsContent value="notifications">
            Change your notifications here.
          </TabsContent>
          <TabsContent value="support">Get support and help here.</TabsContent>
        </Tabs>
      </section>
    </>
  );
}

export default Settings;
