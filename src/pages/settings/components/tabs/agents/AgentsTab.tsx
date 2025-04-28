import { useTranslation } from "react-i18next";
import { DataTable } from "../../shared/DataTable";
import { AgentDialog } from "./AddNewAgentDialog";
import SearchBar from "../../shared/SearchBar";
//import FiltersDropdown from "../../shared/FiltersDropdown";
import { useAgentsTable } from "./useAgentsTable";
import { useAgentColumns } from "../../../table-columns/AgentColumns";
import { useState } from "react";
import { DeleteAgentDialog } from "./DeleteAgentDialog";
import { ManageRoleDialog } from "../../ManageRoleDialog";
import { Agent } from "@/features/settings/types";

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

  const [agentToDelete, setAgentToDelete] = useState<Agent | null>(null);
  const [agentToManageRole, setAgentToManageRole] = useState<Agent | null>(
    null
  );

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

  const getAgentsColumns = useAgentColumns({
    onDeleteClick: handleOpenDeleteDialog,
    onManageRoleClick: handleOpenManageRoleDialog,
  });
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
