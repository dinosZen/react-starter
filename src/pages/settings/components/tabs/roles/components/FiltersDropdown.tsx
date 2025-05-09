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
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { fetchPermissionGroups } from "@/features/settings/api";
import { GroupPermissions } from "@/features/settings/types";

export default function FiltersDropdown({
  currentFilters,
  onApply,
  onReset,
}: {
  currentFilters: { group?: string[] };
  onApply: (f: { group: string[] }) => void;
  onReset: () => void;
}) {
  const [group, setGroup] = useState<string[]>([]);

  const { t } = useTranslation();

  type DropdownOption = {
    value: string;
    label: string;
  };
  const {
    data: groups,
    isLoading,
    isError,
    error,
  } = useQuery<GroupPermissions[], Error>({
    queryKey: ["permissionGroups"],
    queryFn: fetchPermissionGroups,
    staleTime: 1000 * 60 * 60 * 24,
  });

  function dropdownOptions<T extends { id: string | number; title: string }>(
    items: T[]
  ): DropdownOption[] {
    return items.map((item) => ({
      value: String(item.id),
      label: item.title,
    }));
  }

  const permissionGroupsOptions = dropdownOptions(groups || []);

  const reset = () => {
    setGroup([]);
    onReset();
  };

  useEffect(() => {
    setGroup(currentFilters.group || []);
  }, [currentFilters]);

  const apply = () => {
    console.log({ group });
    onApply({ group });
  };

  const filtersLength = group.length;
  const filtersText = filtersLength ? `(${filtersLength})` : "";

  if (isLoading) {
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
          <Funnel className={`h-4 w-4 ${isError ? "text-red-500" : ""}`} />{" "}
          {t("filters")} {filtersText}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 space-y-6 p-4">
        <p className="text-md mb-4">{t("filter-by")}:</p>
        {isError ? (
          <div className="text-red-500">
            {t("error")} {error.message}
          </div>
        ) : (
          <>
            <FilterSection
              label="permission-groups"
              options={permissionGroupsOptions}
              values={group}
              onChange={setGroup}
              displayLimit={2}
            />
            <div className="flex items-center justify-end gap-2 pt-2">
              <Button variant="outline" onClick={reset}>
                {t("reset")}
              </Button>
              <PopoverClose asChild>
                <Button onClick={apply}>{t("apply")}</Button>
              </PopoverClose>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
