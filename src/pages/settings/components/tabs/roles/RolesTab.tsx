import { useTranslation } from "react-i18next";
import { DataTable } from "../../shared/DataTable";
import SearchBar from "../../shared/SearchBar";
import FiltersDropdown from "./components/FiltersDropdown";
import { useRolesTable } from "./hooks/useRolesTable";
import { useRoleColumns } from "../../../table-columns/RoleColumns";
import { useMemo, useState } from "react";
import { DeleteAgentDialog } from "./components/DeleteAgentDialog";
import { ManageRoleDialog } from "../../ManageRoleDialog";
import { Agent, AgentsQueryParams } from "@/features/settings/types";
import { Button } from "@/components/ui/button";

export function RolesTab() {
  const {
    params,
    sorting,
    isLoading,
    data,
    rawSearch,
    setRawSearch,
    onSortChange,
    onPageChange,
    updateFilters,
    currentFilters,
    resetAll,
  } = useRolesTable();

  const { t } = useTranslation();
  const [agentToDelete, setAgentToDelete] = useState<Agent | null>(null);
  const [agentToManageRole, setAgentToManageRole] = useState<Agent | null>(
    null
  );

  console.log("data", data);

  const handleApplyFilters = (
    f: Partial<Pick<AgentsQueryParams, "roles" | "statuses">>
  ) => updateFilters(f);

  const handleResetFilters = () =>
    updateFilters({
      roles: [],
      statuses: [],
    });

  const handleOpenDeleteDialog = (agent: Agent) => {
    setAgentToDelete(agent);
  };

  const handleOpenManageRoleDialog = (agent: Agent) => {
    setAgentToManageRole(agent);
  };

  const handleCloseDialogs = () => {
    setAgentToDelete(null);
    setAgentToManageRole(null);
  };
  const getAgentsColumns = useRoleColumns({
    onDeleteClick: handleOpenDeleteDialog,
    onManageRoleClick: handleOpenManageRoleDialog,
  });
  const hasActiveFilters = useMemo(() => {
    const { roles = [], statuses = [] } = currentFilters;
    return (
      (rawSearch ?? "").trim() !== "" ||
      sorting.length > 0 ||
      roles.length > 0 ||
      statuses.length > 0
    );
  }, [rawSearch, sorting, currentFilters]);

  const agentsColumns = getAgentsColumns();

  return (
    <>
      <div className="flex items-center justify-between py-5">
        <div className="flex items-center gap-4">
          <SearchBar
            value={rawSearch ?? ""}
            placeholder={t("search-placeholder")}
            onChange={setRawSearch}
          />
          <FiltersDropdown
            currentFilters={currentFilters}
            onApply={handleApplyFilters}
            onReset={handleResetFilters}
          />
          <Button
            variant="ghost"
            className="md:inline-flex pl-0"
            onClick={resetAll}
            disabled={!hasActiveFilters}
          >
            {t("clear-filters")}
          </Button>
        </div>
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
      {agentToManageRole && (
        <ManageRoleDialog
          agent={agentToManageRole}
          isOpen={true}
          onClose={handleCloseDialogs}
        />
      )}
      {agentToDelete && (
        <DeleteAgentDialog
          agent={agentToDelete}
          isOpen={true}
          onClose={handleCloseDialogs}
        />
      )}
    </>
  );
}
