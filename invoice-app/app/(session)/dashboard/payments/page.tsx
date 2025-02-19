"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Button from "@/components/button";
interface Invoice {
  id: number;
  companyName: string;
  totalValue: number;
  updatedAt: string;
}

const PaymentsPage = () => {
  const fetchUrl = "/api/payments";
  const session = useSession();
  const userId = session.data?.user.user_id;

  const [payments, setPayments] = useState<Invoice[]>([]);
  const [sortBy, setSortBy] = useState<"updatedAt" | "totalValue">("updatedAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const handleClick = () => {
    sessionStorage.setItem("previousPage", "payments");
  };

  useEffect(() => {
    const fetchPayments = async () => {
      const res = await fetch(
        `${fetchUrl}?userId=${userId}&sortBy=${sortBy}&sortOrder=${sortOrder}`
      );
      const text = await res.text(); // Get raw response
      console.log("Raw API Response:", text);

      try {
        const data = JSON.parse(text);
        setPayments(data);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    };

    fetchPayments();
  }, [sortBy, sortOrder]);

  return (
    <div className="w-full p-4">
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Sort by {sortBy} ({sortOrder === "desc" ? "↓" : "↑"})
        </button>
        <button
          onClick={() =>
            setSortBy(sortBy === "updatedAt" ? "totalValue" : "updatedAt")
          }
          className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
        >
          Sort by {sortBy === "updatedAt" ? "Total Amount" : "Payment Date"}
        </button>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Invoice ID</th>
            <th className="border p-2">Company</th>
            <th className="border p-2">Total Amount</th>
            <th className="border p-2">Payment Date</th>
            <th className="border p-2">Details</th>
          </tr>
        </thead>
        <tbody className="bg-teal-300 bg-opacity-25">
          {payments.map((invoice) => (
            <tr key={invoice.id} className="border">
              <td className="border p-2">{invoice.id}</td>
              <td className="border p-2">{invoice.companyName}</td>
              <td className="border p-2">${invoice.totalValue.toFixed(2)}</td>
              <td className="border p-2">
                {new Date(invoice.updatedAt).toLocaleDateString()}
              </td>
              <td className="border p-2 items-center justify-center">
                <button onClick={handleClick}>
                  <Button
                    href={`./invoices/${invoice.id}`}
                    aria_label={`View details for invoice ${invoice.id}`}
                    label="Go to Invoice"
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentsPage;
