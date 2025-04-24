import { useTranslation } from "react-i18next";

import { DataTable } from "../../DataTable";
import { AgentDialog } from "./AddNewAgentDialog";
import SearchBar from "../../shared/SearchBar";
//import FiltersDropdown from "../../shared/FiltersDropdown";
import { useAgentsTable } from "./useAgentsTable";
import { useAgentColumns } from "../../../table-columns/AgentColumns";

export function AgentsTab() {
  const {
    params,
    sorting,
    isLoading,
    data,
    rawSearch,
    setRawSearch,
    onSortChange,
    onPageChange,
  } = useAgentsTable();

  const { t } = useTranslation();
  const getAgentsColumns = useAgentColumns();
  const agentsColumns = getAgentsColumns();

  return (
    <>
      <div className="flex items-center justify-between py-5">
        <SearchBar
          value={rawSearch ?? ""}
          placeholder={t("searchPlaceholder")}
          onChange={setRawSearch}
        />
        {/* <FiltersDropdown onChange="" /> */}
        <AgentDialog />
      </div>
      <DataTable
        columns={agentsColumns}
        data={data?.data ?? []}
        isLoading={isLoading}
        sorting={sorting}
        onSortChange={onSortChange}
        onPaginationChange={onPageChange}
        paginationData={{
          page: params.page,
          size: params.size,
          total: data?.totalPages ?? 1,
        }}
      />
    </>
  );
}
