import { StatusBadge } from "@/components/ui/status-badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { PaymentMethodsItem } from "@/types/user";

interface PaymentMethodsProps {
  paymentMethods: PaymentMethodsItem[];
}

export const PaymentMethodsPanel = ({
  paymentMethods,
}: PaymentMethodsProps) => {
  return (
    <div className="bg-background-primary-default border-1 border-border-primary-default p-8 rounded-md h-full">
      <h2 className="text-xl font-bold mb-6">Payment Methods</h2>
      <Table>
        <TableHeader>
          <TableRow className={"border-border-primary-default h-10"}>
            <TableHead className="text-text-secondary-default pl-4 pr-2">
              Type
            </TableHead>
            <TableHead className="text-text-secondary-default pl-4 pr-2">
              Provider
            </TableHead>
            <TableHead className="text-text-secondary-default pl-4 pr-2">
              Details
            </TableHead>
            <TableHead className="text-text-secondary-default pl-4 pr-2">
              Status
            </TableHead>
            <TableHead className="text-text-secondary-default pl-4 pr-2">
              Added on
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paymentMethods.map((item) => (
            <TableRow
              className={"border-border-secondary-default h-15"}
              key={crypto.randomUUID()}
            >
              <TableCell className="py-2 px-4">{item.type}</TableCell>
              <TableCell className="py-2 px-4">{item.provider}</TableCell>
              <TableCell className="py-2 px-4">{item.details}</TableCell>
              <TableCell className="py-2 px-4">
                <StatusBadge status={item.status} />
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
