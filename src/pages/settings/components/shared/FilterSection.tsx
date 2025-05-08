import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { MultiSelect } from "./MultiSelect";
import { useTranslation } from "react-i18next";

type Option = { value: string; label: string };

interface FilterSectionProps {
  label: string;
  options: Option[];
  values: string[];
  onChange: (v: string[]) => void;
  displayLimit?: number;
}

export const FilterSection = ({
  label,
  options,
  values,
  onChange,
  displayLimit = Infinity,
}: FilterSectionProps) => {
  const { t } = useTranslation();
  const translatedLabel = t(label);

  const [expanded, setExpanded] = useState(false);

  // decide which values to actually render as badges
  const toShow = expanded ? values : values.slice(0, displayLimit);

  // offer the toggle if there's more than limit
  const hasOverflow = values.length > displayLimit;

  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-medium">{translatedLabel}</span>

      <MultiSelect
        options={options}
        value={values}
        onValueChange={onChange}
        placeholder={`${t("select")} ${translatedLabel.toLowerCase()}`}
        insideBadges={false}
      />

      {!!values.length && (
        <div className="flex flex-wrap gap-2 pt-1">
          {toShow.map((v) => {
            const option = options.find((o) => o.value === v);
            return (
              <Badge
                key={v}
                className="flex items-center gap-1 cursor-pointer border-1 border-border-primary-default"
                onClick={() => onChange(values.filter((x) => x !== v))}
              >
                {option?.label}
                <X className="h-3 w-3 text-text-secondary-default" />
              </Badge>
            );
          })}

          {hasOverflow && (
            <button
              onClick={() => setExpanded((prev) => !prev)}
              className="text-sm underline hover:no-underline"
            >
              {expanded
                ? t("less") // make sure you have this key in your i18n
                : `+${values.length - displayLimit} ${t("more")}`}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
