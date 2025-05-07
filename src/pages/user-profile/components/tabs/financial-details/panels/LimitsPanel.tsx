import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { LimitsItem } from "@/types/user";

interface LimitsProps {
  limits: LimitsItem[];
}

export const LimitsPanel = ({ limits }: LimitsProps) => {
  return (
    <div className="bg-background-primary-default border-1 border-border-primary-default p-8 rounded-md h-full">
      <h2 className="text-xl font-bold mb-6">Limits</h2>
      <Table>
        <TableHeader>
          <TableRow className={"border-border-primary-default h-10"}>
            <TableHead className="text-text-secondary-default pl-4 pr-2">
              Limit Type
            </TableHead>
            <TableHead className="text-text-secondary-default pl-4 pr-2">
              Value
            </TableHead>
            <TableHead className="text-text-secondary-default pl-4 pr-2">
              Scope
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {limits.map((item) => (
            <TableRow
              className={"border-border-secondary-default h-15"}
              key={crypto.randomUUID()}
            >
              <TableCell className="py-2 px-4">{item.limitType}</TableCell>
              <TableCell className="py-2 px-4">{item.value}</TableCell>
              <TableCell className="py-2 px-4">{item.scope}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="space-y-5"></div>
    </div>
  );
};
