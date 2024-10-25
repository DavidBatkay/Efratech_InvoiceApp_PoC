import Link from "next/link";

interface InvoiceProps {
  invoiceId: string;
  invoiceTitle: string;
  invoiceTotalValue: number;
  invoiceStatus: string;
}

const Invoice: React.FC<InvoiceProps> = ({
  invoiceId,
  invoiceTitle,
  invoiceTotalValue,
  invoiceStatus,
}) => {
  // Determine status color based on invoice status
  const statusColor =
    invoiceStatus === "PAID"
      ? "text-green-600"
      : invoiceStatus === "PENDING"
      ? "text-yellow-600"
      : "text-red-600";

  return (
    <div className="w-60 h-90 m-2 bg-stone-200 rounded-xl grid p-4">
      <div className="text-center bg-gradient-to-b from-stone-200 to-gray-100 rounded-sm shadow-xl p-2 font-semibold">
        Invoice #{invoiceId}
      </div>
      <div className="align-top text-lg p-5">{invoiceTitle}</div>

      <div className="flex justify-between items-center px-2 py-1">
        <span className={`font-medium ${statusColor}`}>{invoiceStatus}</span>
        <span className="text-black font-semibold">{invoiceTotalValue} $</span>
      </div>

      <Link
        href={`./invoices/${invoiceId}`}
        aria-label={`View details for invoice ${invoiceId}`}
        className="bg-gradient-to-br from-blue-400 to-blue-600 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded-md mt-4"
      >
        Details
      </Link>
    </div>
  );
};

export default Invoice;
