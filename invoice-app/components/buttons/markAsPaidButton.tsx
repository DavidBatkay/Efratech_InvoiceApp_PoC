"use client";

import { useState } from "react";
import { useMarkAsPaidAPI } from "@/app/api/invoices/__calls__/useMarkAsPaidAPI";
interface MarkAsPaidButtonProps {
  invoiceId: number;
  invoiceStatus: string;
}

const MarkAsPaidButton: React.FC<MarkAsPaidButtonProps> = ({
  invoiceId,
  invoiceStatus,
}) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { markAsPaid } = useMarkAsPaidAPI();
  if (invoiceStatus === "PAID" || invoiceStatus === "ARCHIVED") {
    return null;
  }

  const handleMarkAsPaid = async () => {
    setIsLoading(true);
    try {
      const response = await markAsPaid(invoiceId);

      if (response.error) throw new Error(response.error);

      // Optional: Trigger a refresh or state update if needed
      window.location.reload(); // Simple way to reflect changes
    } catch (error) {
      console.error("Error updating invoice:", error);
    } finally {
      setIsLoading(false);
      setIsConfirmOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsConfirmOpen(true)}
        className="bg-gradient-to-br from-white to-gray-400 text-black px-4 py-2 rounded-lg hover:from-gray-400 hover:to-blue-300"
      >
        Mark as Paid
      </button>

      {isConfirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Confirm Payment
            </h2>
            <p className="text-gray-700">
              Are you sure? This action is irreversible.
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={handleMarkAsPaid}
                disabled={isLoading}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                {isLoading ? "Processing..." : "Confirm"}
              </button>
              <button
                onClick={() => setIsConfirmOpen(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MarkAsPaidButton;
