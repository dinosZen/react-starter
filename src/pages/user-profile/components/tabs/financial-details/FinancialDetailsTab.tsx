import { FinancialDetailsData } from "@/types/user";
import { BeneficiariesPanel } from "./panels/BeneficiariesPanel";
import { FeesStructurePanel } from "./panels/FeesStructurePanel";
import { LimitsPanel } from "./panels/LimitsPanel";
import { PaymentMethodsPanel } from "./panels/PaymentMethodsPanel";

export function FinancialDetailsTab({
  financialDetailsData,
}: Readonly<{
  financialDetailsData: FinancialDetailsData;
}>) {
  return (
    <div className="flex flex-col gap-6">
      <PaymentMethodsPanel
        paymentMethods={financialDetailsData.paymentMethods}
      />
      <BeneficiariesPanel beneficiaries={financialDetailsData.beneficiaries} />
      <FeesStructurePanel feesStructure={financialDetailsData.feesStructure} />
      <LimitsPanel limits={financialDetailsData.limits} />
    </div>
  );
}
