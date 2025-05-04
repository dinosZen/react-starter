import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";
import { Funnel } from "lucide-react";
import { FilterSection } from "../../../shared/FilterSection";
import { agentRoleOptions } from "@/lib/constants.ts";
import { useTranslation } from "react-i18next";

// const permOptions = [
//   { value: "0-4", label: "0 – 4" },
//   { value: "10+", label: "10+" },
// ];
const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

export default function FiltersDropdown({
  currentFilters,
  onApply,
  onReset,
}: {
  currentFilters: { roles: string[]; perms?: string[]; statuses: string[] };
  onApply: (f: {
    roles: string[];
    //perms: string[];
    statuses: string[];
  }) => void;
  onReset: () => void;
}) {
  const [roles, setRoles] = useState<string[]>([]);
  //const [perms, setPerms] = useState<string[]>([]);
  const [statuses, setStatuses] = useState<string[]>([]);
  const { t } = useTranslation();

  const reset = () => {
    setRoles([]);
    //setPerms([]);
    setStatuses([]);
    onReset();
  };
  useEffect(() => {
    setRoles(currentFilters.roles);
    //setPerms(currentFilters.perms);
    setStatuses(currentFilters.statuses);
  }, [currentFilters]);

  const apply = () => {
    console.log({ roles, statuses });
    onApply({ roles, statuses });
  };

  // const filtersLength = roles.length + perms.length + statuses.length;
  const filtersLength = roles.length + statuses.length;
  const filtersText = filtersLength ? `(${filtersLength})` : "";

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

        <FilterSection
          label="role"
          options={agentRoleOptions}
          values={roles}
          onChange={setRoles}
        />

        {/* <FilterSection
          label="Custom permissions"
          options={permOptions}
          values={perms}
          onChange={setPerms}
        /> */}

        <FilterSection
          label="status"
          options={statusOptions}
          values={statuses}
          onChange={setStatuses}
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
