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
    <div className="w-60 h-[220px] m-2 bg-white rounded-xl flex flex-col justify-between p-4">
      <div className="text-center bg-gradient-to-b from-white to-stone-100 rounded-sm shadow-xl p-2 font-semibold">
        Invoice #{invoiceId}
      </div>

      {/* Restrict title size and prevent text overflow */}
      <div className="text-lg p-2 text-center flex-grow flex items-center justify-center">
        <strong className="truncate w-full">{invoiceTitle}</strong>
      </div>

      <div className="text-right text-gray-500 text-sm">
        Created: {new Date(invoiceCreatedAt).toLocaleDateString()}
      </div>

      <div className="flex justify-between items-center px-2 py-1 rounded-md bg-gray-100 text-sm">
        <span className={`font-medium ${statusColor}`}>{invoiceStatus}</span>
        <span className="text-black font-semibold">{invoiceTotalValue} $</span>
      </div>

      {/* Ensure the button stays at the bottom */}
      <div>
        <button
          className="mt-auto flex justify-center w-full"
          onClick={handleClick}
        >
          <Button
            href={`./invoices/${invoiceId}`}
            aria_label={`View details for invoice ${invoiceId}`}
            label="Details"
          />
        </button>
      </div>
    </div>
  );
};

export default Invoice;
