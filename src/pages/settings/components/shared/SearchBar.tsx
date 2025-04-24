import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}
const SearchBar = ({ value, placeholder, onChange }: SearchBarProps) => {
  return (
    <div className="relative min-w-[20rem]">
      <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
        <Search className="h-4 w-4" aria-hidden="true" />
      </div>
      <Input
        id="search"
        type="search"
        placeholder={placeholder}
        className="w-full rounded-lg bg-background-primary-default pl-8"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
export default SearchBar;
