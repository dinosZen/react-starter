import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { FeesStructureItem } from "@/types/user";

interface FeesStructureProps {
  feesStructure: FeesStructureItem[];
}

export const FeesStructurePanel = ({ feesStructure }: FeesStructureProps) => {
  const formattedDate = (date: string) => {
    const dateObj = new Date(date);

    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(dateObj);
  };
  return (
    <div className="bg-background-primary-default border-1 border-border-primary-default p-8 rounded-md h-full">
      <h2 className="text-xl font-bold mb-6">Fees Structure</h2>
      <Table>
        <TableHeader>
          <TableRow className={"border-border-primary-default h-10"}>
            <TableHead className="text-text-secondary-default pl-4 pr-2">
              Fee Type
            </TableHead>
            <TableHead className="text-text-secondary-default pl-4 pr-2">
              Value
            </TableHead>
            <TableHead className="text-text-secondary-default pl-4 pr-2">
              Effective since
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {feesStructure.map((item) => (
            <TableRow
              className={"border-border-secondary-default h-15"}
              key={crypto.randomUUID()}
            >
              <TableCell className="py-2 px-4">{item.feeType}</TableCell>
              <TableCell className="py-2 px-4">{item.value}</TableCell>
              <TableCell className="py-2 px-4">
                {formattedDate(item.effectiveSince)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="space-y-5"></div>
    </div>
  );
};
