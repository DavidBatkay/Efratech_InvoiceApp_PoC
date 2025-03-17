"use client";
import Link from "next/link";

const CustomerDetailsAnchor: React.FC<{
  invoice: {
    id: number;
    customerId: number | null;
    customerName: string | null;
    customer?: { customerName: string } | null;
  };
}> = ({ invoice }) => {
  if (!invoice.customer?.customerName) {
    return <span>{invoice.customerName}</span>;
  }

  const handleClick = () => {
    sessionStorage.setItem("previousPage", `invoices/${invoice.id}`);
  };

  return (
    <button onClick={handleClick}>
      <Link
        href={`/dashboard/customers/${invoice.customerId}`}
        className="font-medium text-blue-600 hover:underline"
      >
        {invoice.customer.customerName}
      </Link>
    </button>
  );
};

export default CustomerDetailsAnchor;
