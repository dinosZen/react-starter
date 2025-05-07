import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { BeneficiariesItem } from "@/types/user";

interface BeneficiariesProps {
  beneficiaries: BeneficiariesItem[];
}

export const BeneficiariesPanel = ({ beneficiaries }: BeneficiariesProps) => {
  return (
    <div className="bg-background-primary-default border-1 border-border-primary-default p-8 rounded-md h-full">
      <h2 className="text-xl font-bold mb-6">Beneficiaries</h2>
      <Table>
        <TableHeader>
          <TableRow className={"border-border-primary-default h-10"}>
            <TableHead className="text-text-secondary-default pl-4 pr-2">
              Name
            </TableHead>
            <TableHead className="text-text-secondary-default pl-4 pr-2">
              Type
            </TableHead>
            <TableHead className="text-text-secondary-default pl-4 pr-2">
              Details
            </TableHead>
            <TableHead className="text-text-secondary-default pl-4 pr-2">
              Verified
            </TableHead>
            <TableHead className="text-text-secondary-default pl-4 pr-2">
              Added on
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {beneficiaries.map((item) => (
            <TableRow
              className={"border-border-secondary-default h-15"}
              key={crypto.randomUUID()}
            >
              <TableCell className="py-2 px-4">{item.name}</TableCell>
              <TableCell className="py-2 px-4">{item.type}</TableCell>
              <TableCell className="py-2 px-4">{item.details}</TableCell>
              <TableCell className="py-2 px-4">
                {item.verified ? "✅ Yes" : "❌ No"}
              </TableCell>
              <TableCell className="py-2 px-4">{item.addedOn}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="space-y-5"></div>
    </div>
  );
};
