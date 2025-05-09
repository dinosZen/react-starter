import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";
import { Funnel, Loader } from "lucide-react";
import { FilterSection } from "../../../shared/FilterSection";
import { statusOptions } from "@/constants/settings";
import { useTranslation } from "react-i18next";
import { useRoles } from "@/features/settings/api";
import { Role, RolesQueryParams } from "@/features/settings/types";

export default function FiltersDropdown({
  currentFilters,
  onApply,
  onReset,
}: {
  currentFilters: { roles?: string[]; statuses?: string[] };
  onApply: (f: { roles: string[]; statuses: string[] }) => void;
  onReset: () => void;
}) {
  const [roles, setRoles] = useState<string[]>([]);
  const [statuses, setStatuses] = useState<string[]>([]);
  const { t } = useTranslation();

  const reset = () => {
    setRoles([]);
    setStatuses([]);
    onReset();
  };

  useEffect(() => {
    setRoles(currentFilters.roles || []);
    setStatuses(currentFilters.statuses || []);
  }, [currentFilters]);

  const apply = () => {
    console.log({ roles, statuses });
    onApply({ roles, statuses });
  };

  const filtersLength = roles.length + statuses.length;
  const filtersText = filtersLength ? `(${filtersLength})` : "";

  const params: RolesQueryParams = {
    page: 1,
    size: 10,
  };
  const {
    data,
    isLoading: isLoadingRoles,
    isError: isErrorRoles,
    error: rolesError,
  } = useRoles(params);

  // Extracting roles for the select component
  const extractGroups = (roles?: { data?: Role[] }) => {
    if (!roles?.data || !Array.isArray(roles.data)) {
      return [];
    }

    const uniqueGroups = new Map();

    roles.data.forEach((role) => {
      const { id, title } = role;

      if (!uniqueGroups.has(id)) {
        uniqueGroups.set(id, { id, title });
      }
    });

    return Array.from(uniqueGroups.values()).map((item) => ({
      value: String(item.id),
      label: item.title,
    }));
  };

  const agentRoleOptions = extractGroups(data);

  if (isLoadingRoles) {
    return (
      <Button variant="outline" className="gap-2">
        <Loader className="inline animate-spin" /> {t("filters")} {filtersText}
      </Button>
    );
  }

  return (
    <Popover>
      <PopoverTrigger
        asChild
        className="data-[state=open]:!bg-background-secondary-default data-[state=open]:!border-border-primary-hover"
      >
        <Button variant="outline" className="gap-2">
          <Funnel className="h-4 w-4" /> {t("filters")} {filtersText}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 space-y-6 p-4">
        <p className="text-md mb-4">{t("filter-by")}:</p>
        {isErrorRoles ? (
          <div className="text-red-500">
            {t("error")} {rolesError?.message || t("unknown-error")}
          </div>
        ) : (
          <>
            <FilterSection
              label="role"
              options={agentRoleOptions}
              values={roles}
              onChange={setRoles}
              displayLimit={2}
            />
          </>
        )}
        <FilterSection
          label="status"
          options={statusOptions}
          values={statuses}
          onChange={setStatuses}
          displayLimit={3}
        />

        <div className="flex items-center justify-end gap-2 pt-2">
          <Button variant="outline" onClick={reset}>
            {t("reset")}
          </Button>
          <PopoverClose asChild>
            <Button onClick={apply}>{t("apply")}</Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
}
