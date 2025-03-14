"use client";
import Link from "next/link";
const CustomerDetailsAnchor: React.FC<{
  invoice: { customerId: number | null; customerName: string | null };
}> = ({ invoice }) => {
  const handleClick = () => {
    sessionStorage.setItem("previousPage", "invoices");
  };
  return (
    <button onClick={handleClick}>
      <Link
        href={`/dashboard/customers/${invoice.customerId}`}
        className="font-medium text-blue-600 hover:underline"
      >
        {invoice.customerName}
      </Link>
    </button>
  );
};

export default CustomerDetailsAnchor;
