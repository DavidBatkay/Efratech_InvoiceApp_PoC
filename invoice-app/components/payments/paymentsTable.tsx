"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Button from "@/components/buttons/button";
import Link from "next/link";
import { usePaymentAPI } from "@/app/api/__calls__/usePaymentAPI";

interface Payment {
  id: number;
  customerId: number;
  customer: { customerName: string };
  amount: number;
  createdAt: string;
  invoiceId: number;
  notes: string;
}

const PaymentsTable = () => {
  const session = useSession();
  const userId = session.data?.user.user_id;
  const { fetchPayments } = usePaymentAPI();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [sortBy, setSortBy] = useState<"createdAt" | "amount">("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    const loadPayments = async () => {
      if (!userId) return;
      const data = await fetchPayments(sortBy, sortOrder);
      if (!data.error) setPayments(data);
    };
    loadPayments();
  }, [userId, sortBy, sortOrder, fetchPayments]);
  const handleClick = () => {
    sessionStorage.setItem("previousPage", "payments");
  };
  return (
    <div className="w-full p-4">
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Sort by {sortBy === "createdAt" ? "Payment Date" : "Total Amount"} (
          {sortOrder === "desc" ? "↓" : "↑"})
        </button>
        <button
          onClick={() =>
            setSortBy(sortBy === "createdAt" ? "amount" : "createdAt")
          }
          className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
        >
          Sort by {sortBy === "createdAt" ? "Total Amount" : "Payment Date"}
        </button>
      </div>

      {/* Responsive Table */}
      <div className="w-full">
        {payments[0] !== undefined ? (
          <table className="w-5/6 border-collapse border border-gray-300 hidden md:table mx-auto">
            <thead>
              <tr className="bg-gray-200 text-sm md:text-base">
                <th className="border p-2">Payment ID</th>
                <th className="border p-2">Customer</th>
                <th className="border p-2">Total Amount</th>
                <th className="border p-2">Payment Date</th>
                <th className="border p-2">Notes</th>
                <th className="border p-2">Details</th>
              </tr>
            </thead>
            <tbody className="bg-amber-100 bg-opacity-40 text-sm md:text-base">
              {payments.map((payment) => (
                <tr key={payment.id} className="border">
                  <td className="border p-2">{payment.id}</td>
                  <td className="border p-2">
                    {payment.customer?.customerName || "Deleted Customer"}
                  </td>
                  <td className="border p-2">${payment.amount.toFixed(2)}</td>
                  <td className="border p-2">
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border p-2 text-center">
                    <Button
                      fromColor="from-amber-600 scale-75 my-2"
                      toColor="to-amber-800"
                      href={`./payments/${payment.id}/edit`}
                      aria_label={`Edit notes for payment ${payment.id}`}
                      label={payment.notes ? "View Notes" : "Add Notes"}
                    />
                  </td>

                  <td className="border p-2 text-center">
                    <button onClick={handleClick} className="w-full md:w-auto">
                      <Button
                        fromColor="from-blue-400 my-2"
                        href={`./invoices/${payment.invoiceId}`}
                        aria_label={`View details for invoice ${payment.invoiceId}`}
                        label="Go to Invoice"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-20 justify-items-center justify-center items-center text-center">
            <p>
              No registered payments were found. To create a payment, mark a
              pending invoice as paid.
            </p>
            <Link href={`/dashboard/invoices`} className="text-blue-400">
              Go to invoices
            </Link>
          </div>
        )}

        {/* Mobile View - Cards Instead of Table */}
        <div className="md:hidden flex flex-col gap-4">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="border p-3 bg-amber-100 bg-opacity-40 rounded-md"
            >
              <p className="text-sm">
                <strong>Payment ID:</strong> {payment.id}
              </p>
              <p className="text-sm">
                <strong>Customer:</strong>{" "}
                {payment.customer?.customerName || "Deleted Customer"}
              </p>
              <p className="text-sm">
                <strong>Total Amount:</strong> ${payment.amount.toFixed(2)}
              </p>
              <p className="text-sm">
                <strong>Payment Date:</strong>{" "}
                {new Date(payment.createdAt).toLocaleDateString()}
              </p>
              <div className="flex justify-between">
                <button className="mt-2 w-full">
                  <Button
                    fromColor="from-amber-600 scale-75"
                    toColor="to-amber-800"
                    href={`./payments/${payment.id}/edit`}
                    aria_label={`Edit notes for payment ${payment.id}`}
                    label={payment.notes ? "View Notes" : "Add Notes"}
                  />
                </button>

                <button onClick={handleClick} className="mt-2 w-full">
                  <Button
                    href={`./invoices/${payment.invoiceId}`}
                    aria_label={`View details for invoice ${payment.invoiceId}`}
                    label="Go to Invoice"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentsTable;
