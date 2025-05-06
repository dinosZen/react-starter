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
import { agentRoleOptions } from "@/constants/settings";
import { useTranslation } from "react-i18next";

export default function FiltersDropdown({
  currentFilters,
  onApply,
  onReset,
}: {
  currentFilters: { roles?: string[] };
  onApply: (f: { roles: string[] }) => void;
  onReset: () => void;
}) {
  const [roles, setRoles] = useState<string[]>([]);

  const { t } = useTranslation();

  const reset = () => {
    setRoles([]);
    onReset();
  };
  useEffect(() => {
    setRoles(currentFilters.roles || []);
  }, [currentFilters]);

  const apply = () => {
    console.log({ roles });
    onApply({ roles });
  };

  const filtersLength = roles.length;
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
          label="permission"
          options={agentRoleOptions}
          values={roles}
          onChange={setRoles}
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
      </PopoverContent>
    </Popover>
  );
}
