"use client";

import { useEffect, useState } from "react";
import CreateInvoiceButton from "@/components/createInvoice";
import Invoice from "@/components/invoice";
import { useInvoiceAPI } from "@/app/api/__calls__/useInvoiceAPI";
type Invoice = {
  id: number;
  customer: { customerName: string };
  customerName: string;
  totalValue: number;
  status: string;
  createdAt: Date;
};

const InvoiceList: React.FC = () => {
  const [invoices, setInvoices] = useState([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [filter, setFilter] = useState<
    "all" | "pending" | "overdue" | "paid" | "archived"
  >("all");
  const { fetchInvoices } = useInvoiceAPI();
  useEffect(() => {
    const fetchAllInvoices = async () => {
      const data = await fetchInvoices(sortOrder, filter);
      setInvoices(data);
    };

    fetchAllInvoices();
  }, [sortOrder, filter, fetchInvoices]);

  return (
    <div className="w-full">
      <div className="flex gap-4 items-center mb-4">
        <button
          onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
          className={`px-4 py-2 rounded font-semibold transition-colors duration-200 ${
            sortOrder === "desc"
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-black hover:bg-gray-400"
          }`}
        >
          {sortOrder === "desc"
            ? "Sort: Newest First ↓"
            : "Sort: Oldest First ↑"}
        </button>

        <select
          value={filter}
          onChange={(e) =>
            setFilter(
              e.target.value as
                | "all"
                | "pending"
                | "overdue"
                | "paid"
                | "archived"
            )
          }
          className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 cursor-pointer focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="all">All Invoices</option>
          <option value="pending">Pending</option>
          <option value="overdue">Overdue</option>
          <option value="paid">Paid</option>
          <option value="archived">Archived</option>
        </select>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 justify-items-center">
        <CreateInvoiceButton />
        {invoices.map((invoice: Invoice) => (
          <li key={invoice.id}>
            <Invoice
              invoiceId={String(invoice.id)}
              invoiceTitle={
                invoice.customer?.customerName
                  ? invoice.customer?.customerName
                  : invoice.customerName
              }
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
