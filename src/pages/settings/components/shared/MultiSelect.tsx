import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";

interface MultiSelectProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];

  value?: string[];
  insideBadges?: boolean;
  onValueChange: (value: string[]) => void;
  defaultValue?: string[];
  placeholder?: string;
  animation?: number;
  maxCount?: number;
  modalPopover?: boolean;
  asChild?: boolean;
  className?: string;
}

export const MultiSelect = React.forwardRef<
  HTMLButtonElement,
  MultiSelectProps
>(
  (
    {
      options,
      value,
      onValueChange,
      defaultValue = [],
      placeholder = "Select options",
      modalPopover = false,
      className,
      ...props
    },
    ref
  ) => {
    const { t } = useTranslation();
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const [internal, setInternal] = React.useState<string[]>(defaultValue);
    const selected = value ?? internal;

    const setSelected = (next: string[]) => {
      if (value === undefined) {
        setInternal(next);
      }
      onValueChange(next);
    };

    const toggleOption = (option: string) => {
      const newSelectedValues = selected.includes(option)
        ? selected.filter((value) => value !== option)
        : [...selected, option];
      setSelected(newSelectedValues);
    };

    const handleClear = () => {
      setSelected([]);
      onValueChange([]);
    };

    const handleTogglePopover = () => {
      setIsPopoverOpen((prev) => !prev);
    };

    const toggleAll = () => {
      if (selected.length === options.length) {
        handleClear();
      } else {
        const allValues = options.map((option) => option.value);
        setSelected(allValues);
        onValueChange(allValues);
      }
    };

    return (
      <Popover
        open={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
        modal={modalPopover}
      >
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            {...props}
            onClick={handleTogglePopover}
            className={cn(
              "flex w-full p-1 rounded-md border min-h-10 h-auto items-center justify-between [&_svg]:pointer-events-auto",
              className
            )}
            variant={"outline"}
          >
            {selected.length === 0 ? (
              <span className="text-sm text-text-primary-default">
                {placeholder}
              </span>
            ) : (
              <span className="text-sm text-text-primary-default">
                {selected.length} {t("selected")}
              </span>
            )}
            <ChevronDown
              className={cn(
                "ml-auto h-4 w-4 cursor-pointer text-text-primary-default transition-transform",
                isPopoverOpen && "rotate-180"
              )}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-calc(80-8) p-0 bg-background-primary-default border-foreground/10 shadow-md rounded-md"
          align="start"
          onEscapeKeyDown={() => setIsPopoverOpen(false)}
        >
          <Command className="w-full">
            <CommandList className="w-full">
              <CommandEmpty>{t("no-results")}</CommandEmpty>
              <CommandGroup className="w-full">
                <CommandItem
                  key="all"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    toggleAll();
                  }}
                  className="cursor-pointer w-full"
                >
                  <div
                    className={cn(
                      "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary"
                    )}
                  >
                    <Checkbox checked={selected.length === options.length} />
                  </div>
                  <span>{t("select-all")}</span>
                </CommandItem>
                {options.map((option) => {
                  const isSelected = selected.includes(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        toggleOption(option.value);
                      }}
                      className="cursor-pointer"
                    >
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary"
                        )}
                      >
                        <Checkbox checked={isSelected} />
                      </div>
                      <span>{option.label}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup>
                <div className="flex items-center justify-end gap-2">
                  {selected.length > 0 && (
                    <>
                      <CommandItem
                        onSelect={handleClear}
                        className="flex-1 justify-center cursor-pointer max-w-fit hover:bg-background-secondary-default"
                      >
                        {t("clear")}
                      </CommandItem>
                      <Separator
                        orientation="vertical"
                        className="flex min-h-6 h-full"
                      />
                    </>
                  )}
                  <CommandItem
                    onSelect={() => setIsPopoverOpen(false)}
                    className="flex-1 justify-center cursor-pointer max-w-fit hover:bg-background-secondary-default"
                  >
                    {t("close")}
                  </CommandItem>
                </div>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

MultiSelect.displayName = "MultiSelect";
