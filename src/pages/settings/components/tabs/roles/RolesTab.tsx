import { useTranslation } from "react-i18next";
import { DataTable } from "../../shared/DataTable";
import SearchBar from "../../shared/SearchBar";
import FiltersDropdown from "./components/FiltersDropdown";
import { useRolesTable } from "./hooks/useRolesTable";
import { useRoleColumns } from "../../../table-columns/RoleColumns";
import { useMemo, useState } from "react";
import { DeleteRoleDialog } from "./components/DeleteRoleDialog";
//import { ManageRoleDialog } from "../../ManageRoleDialog";
import { Role, RolesQueryParams } from "@/features/settings/types";
import { Button } from "@/components/ui/button";

export function RolesTab({ isActive }: { isActive: boolean }) {
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
  } = useRolesTable(isActive);

  const { t } = useTranslation();

  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);

  const [roleToManageRole, setRoleToManageRole] = useState<Role | null>(null);

  const handleApplyFilters = (f: Partial<Pick<RolesQueryParams, "group">>) =>
    updateFilters(f);

  const handleResetFilters = () =>
    updateFilters({
      group: [],
    });

  const handleOpenDeleteDialog = (role: Role) => {
    setRoleToDelete(role);
  };

  const handleOpenManageRoleDialog = (role: Role) => {
    setRoleToManageRole(role);
  };

  const handleCloseDialogs = () => {
    setRoleToDelete(null);

    setRoleToManageRole(null);
  };

  const getRolesColumns = useRoleColumns({
    onDeleteClick: handleOpenDeleteDialog,

    onManageRoleClick: handleOpenManageRoleDialog,
  });

  const hasActiveFilters = useMemo(() => {
    const { group = [] } = currentFilters;

    return (
      (rawSearch ?? "").trim() !== "" || sorting.length > 0 || group.length > 0
    );
  }, [rawSearch, sorting, currentFilters]);

  const rolesColumns = getRolesColumns();

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
        columns={rolesColumns}
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

      {/* {roleToManageRole && (
        <ManageRoleDialog
        role={roleToManageRole}
        isOpen={true}
        onClose={handleCloseDialogs}
        />
        )} */}

      {roleToDelete && (
        <DeleteRoleDialog
          role={roleToDelete}
          isOpen={true}
          onClose={handleCloseDialogs}
        />
      )}
    </>
  );
}
