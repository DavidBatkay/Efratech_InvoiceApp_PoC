import Link from "next/link";

const Invoice: React.FC<{ invoiceId: String; invoiceTitle: String }> = ({
  invoiceId,
  invoiceTitle,
}) => {
  return (
    <div className="w-60 h-90 bg-stone-300  align-baseline rounded-xl grid">
      <div className="text-center bg-stone-200 rounded-sm shadow-xl">
        Invoice #{invoiceId}
      </div>
      <div className="align-top w-24 p-5">{invoiceTitle}</div>
      <Link
        className="bg-blue-500 hover:bg-blue-700 right-3 text-white font-bold py-2 px-4 rounded-md"
        href={`./invoices/${invoiceId}`}
      >
        Details
      </Link>
    </div>
  );
};

export default Invoice;
