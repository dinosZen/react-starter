import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

export type PersonalInfoItem = {
  label: string;
  value: string;
};

interface PersonalInfoPanelProps {
  items: PersonalInfoItem[];
  hasCopyButton?: boolean;
}

export const PersonalInfoPanel = ({
  items,
  hasCopyButton = false,
}: PersonalInfoPanelProps) => {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-background-primary-default text-text-primary-default p-8 rounded-md h-full">
      <h2 className="text-xl font-bold mb-6">Personal info</h2>

      <div className="space-y-5">
        {items.map((item, index) => (
          <div key={item.label} className="grid grid-cols-[1fr_1fr] gap-4">
            <div className="text-text-secondary-default text-sm">
              {item.label}
            </div>
            <div className="flex items-center justify-between gap-2 text-sm">
              {item.value}
              {hasCopyButton && index === 0 && (
                <Button
                  variant="outline"
                  size="icon"
                  className=""
                  onClick={() => handleCopy(item.value)}
                >
                  <Copy className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
