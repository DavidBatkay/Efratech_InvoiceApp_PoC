import Button from "./buttons/button";

interface InvoiceProps {
  invoiceId: string;
  invoiceTitle: string;
  invoiceTotalValue: number;
  invoiceStatus: string;
  invoiceCreatedAt: Date;
}

const Invoice: React.FC<InvoiceProps> = ({
  invoiceId,
  invoiceTitle,
  invoiceTotalValue,
  invoiceStatus,
  invoiceCreatedAt,
}) => {
  const handleClick = () => {
    sessionStorage.setItem("previousPage", "invoices");
  };
  // Determine status color based on invoice status
  const statusColor =
    invoiceStatus === "PAID"
      ? "text-green-600"
      : invoiceStatus === "PENDING"
      ? "text-yellow-600"
      : invoiceStatus === "ARCHIVED"
      ? "text-blue-600"
      : "text-red-600";

  return (
    <div className="w-60 h-90 m-2 bg-white rounded-xl grid p-4">
      <div className="text-center bg-gradient-to-b from-white to-stone-100 rounded-sm shadow-xl p-2 font-semibold">
        Invoice #{invoiceId}
      </div>
      <div className="align-top text-lg p-5 text-center">
        <strong>{invoiceTitle}</strong>
      </div>

      <div className="text-right text-gray-500">
        Created: {new Date(invoiceCreatedAt).toLocaleDateString()}
      </div>

      <div className="flex justify-between items-center px-2 py-1 rounded-md bg-gray-100">
        <span className={`font-medium ${statusColor}`}>{invoiceStatus}</span>
        <span className="text-black font-semibold">{invoiceTotalValue} $</span>
      </div>
      <button onClick={handleClick}>
        <Button
          href={`./invoices/${invoiceId}`}
          aria_label={`View details for invoice ${invoiceId}`}
          label="Details"
        />
      </button>
    </div>
  );
};

export default Invoice;
