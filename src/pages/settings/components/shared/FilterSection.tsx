import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { MultiSelect } from "./MultiSelect";

type Option = { value: string; label: string };

interface FilterSectionProps {
  label: string;
  options: Option[];
  values: string[];
  onChange: (v: string[]) => void;
}

export const FilterSection = ({
  label,
  options,
  values,
  onChange,
}: FilterSectionProps) => {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-medium">{label}</span>

      <MultiSelect
        options={options}
        value={values}
        onValueChange={onChange}
        placeholder={`Select ${label.toLowerCase()}`}
        insideBadges={false}
      />

      {!!values.length && (
        <div className="flex flex-wrap gap-2 pt-1">
          {values.map((v) => {
            const option = options.find((o) => o.value === v);
            return (
              <Badge
                key={v}
                className="flex items-center gap-1 cursor-pointer border-1 border-border-primary-default"
                onClick={() => {
                  onChange(values.filter((x) => x !== v));
                }}
              >
                {option?.label}
                <X className="h-3 w-3 text-text-secondary-default" />
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
};
