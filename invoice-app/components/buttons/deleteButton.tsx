"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const DeleteInvoiceButton: React.FC<{ invoiceId: number }> = ({
  invoiceId,
}) => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await fetch("/api/deleteInvoices", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invoiceId }),
      });

      if (!response.ok) throw new Error("Failed to delete invoice");

      // Close modal and redirect
      setShowModal(false);
      router.push("/dashboard/invoices");
    } catch (error) {
      console.error("Error deleting invoice:", error);
    }
  };

  return (
    <>
      {/* Delete Button */}
      <button
        aria-label="Delete Invoice"
        className="bg-gradient-to-br from-red-400 to-red-600 hover:opacity-85 text-white font-bold py-2 px-4 rounded-md mt-4 flex items-center justify-center"
        onClick={() => setShowModal(true)}
      >
        Delete
      </button>
      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-semibold text-red-600">
              Confirm Delete
            </h2>
            <p className="text-gray-700">
              Are you sure you want to delete this invoice?
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleDelete}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteInvoiceButton;
