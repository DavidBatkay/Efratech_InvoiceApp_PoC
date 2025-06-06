import { InvoiceStatus } from "@prisma/client";
import Button from "./button";
const EditButton: React.FC<{ invoiceId: number; invoiceStatus: string }> = ({
  invoiceId,
  invoiceStatus,
}) => {
  let fromColor = "from-amber-400";
  let toColor = "to-amber-600";
  const paid =
    invoiceStatus === InvoiceStatus.PAID ||
    invoiceStatus === InvoiceStatus.ARCHIVED;
  if (paid) {
    fromColor = "from-gray-400 cursor-not-allowed";
    toColor = "to-gray-600";
  }
  return (
    <>
      <Button
        href={`/dashboard/invoices/${invoiceId}/edit`}
        disabled={paid}
        aria_label="Edit invoice"
        label="Edit"
        fromColor={fromColor}
        toColor={toColor}
      />
    </>
  );
};

export default EditButton;
