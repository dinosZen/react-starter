import { useTranslation } from "react-i18next";
import { DataTable } from "../../shared/DataTable";
import { AgentDialog } from "./AddNewAgentDialog";
import SearchBar from "../../shared/SearchBar";
import FiltersDropdown from "./FiltersDropdown";
import { useAgentsTable } from "./useAgentsTable";
import { useAgentColumns } from "../../../table-columns/AgentColumns";
import { useMemo, useState } from "react";
import { DeleteAgentDialog } from "./DeleteAgentDialog";
import { ManageRoleDialog } from "../../ManageRoleDialog";
import { Agent } from "@/features/settings/types";
import { Button } from "@/components/ui/button";
import { AgentStatusDialog } from "./AgentStatusDialog";

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
    updateFilters,
    currentFilters,
    resetAll,
  } = useAgentsTable();

  const { t } = useTranslation();
  const [agentToDelete, setAgentToDelete] = useState<Agent | null>(null);
  const [agentToManageRole, setAgentToManageRole] = useState<Agent | null>(
    null
  );
  const [agentStatusChange, setAgentStatusChange] = useState<Agent | null>(
    null
  );

  const handleApplyFilters = (f) => updateFilters(f);
  const handleResetFilters = () =>
    updateFilters({
      roles: [],
      //perms: [],
      statuses: [],
    });

  const handleOpenDeleteDialog = (agent: Agent) => {
    setAgentToDelete(agent);
  };

  const handleOpenManageRoleDialog = (agent: Agent) => {
    setAgentToManageRole(agent);
  };
  const handleOpenStatusDialog = (agent: Agent) => {
    setAgentStatusChange(agent);
  };

  const handleCloseDialogs = () => {
    setAgentToDelete(null);
    setAgentToManageRole(null);
    setAgentStatusChange(null);
  };
  const getAgentsColumns = useAgentColumns({
    onDeleteClick: handleOpenDeleteDialog,
    onManageRoleClick: handleOpenManageRoleDialog,
    onStatusClick: handleOpenStatusDialog,
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
            placeholder={t("searchPlaceholder")}
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
            {t("agent.clearFilters")}
          </Button>
        </div>
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
      {agentStatusChange && (
        <AgentStatusDialog
          agent={agentStatusChange}
          isOpen={true}
          onClose={handleCloseDialogs}
          //mode="activation"
        />
      )}
    </>
  );
}
