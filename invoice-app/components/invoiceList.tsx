"use client";

import { useEffect, useState } from "react";
import CreateInvoiceButton from "@/components/createInvoice";
import Invoice from "@/components/invoice";

const InvoiceList: React.FC<{ userId: number; fetchUrl: string }> = ({
  userId,
  fetchUrl,
}) => {
  const [invoices, setInvoices] = useState([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    const fetchInvoices = async () => {
      const res = await fetch(
        `${fetchUrl}?userId=${userId}&sortOrder=${sortOrder}`
      );
      const data = await res.json();
      setInvoices(data);
    };

    fetchInvoices();
  }, [userId, sortOrder, fetchUrl]);

  return (
    <div className="w-full">
      <button
        onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
        className={`px-4 py-2 rounded font-semibold transition-colors duration-200 ${
          sortOrder === "desc"
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-gray-300 text-black hover:bg-gray-400"
        }`}
      >
        {sortOrder === "desc" ? "Sort: Newest First ↓" : "Sort: Oldest First ↑"}
      </button>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
        <CreateInvoiceButton />
        {invoices.map((invoice: any) => (
          <li key={invoice.id}>
            <Invoice
              invoiceId={invoice.id}
              invoiceTitle={invoice.companyName}
              invoiceTotalValue={invoice.totalValue}
              invoiceStatus={invoice.status}
              invoiceCreatedAt={invoice.createdAt}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvoiceList;
