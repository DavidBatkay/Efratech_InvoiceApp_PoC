"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
const PaymentFormEdit = ({
  payment,
}: {
  payment: { id: number; notes: string | null };
}) => {
  const [notes, setNotes] = useState(payment.notes || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await fetch(`/api/payments/edit/${payment.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }),
      });
      router.push(`/dashboard/payments/${payment.id}/edit`);
    } catch (error) {
      console.error("Failed to update payment", error);
    } finally {
      setIsSubmitting(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="p-4 border rounded-md">
      <h2 className="text-lg font-semibold mb-2 text-white">
        {`${notes ? "Edit" : "Add"}`} Payment Notes
      </h2>
      <textarea
        className="w-full p-2 border rounded-md"
        rows={4}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <div className="flex justify-between gap-4">
        <button
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => setShowConfirm(true)}
          disabled={isSubmitting}
        >
          Save Changes
        </button>
        <Link href="/dashboard/payments">
          <button className="mt-2 bg-gray-500 text-white px-4 py-2 rounded-md">
            Go back
          </button>
        </Link>
      </div>
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md shadow-lg">
            <p>Are you sure you want to update the notes?</p>
            <div className="flex justify-end mt-2">
              <button
                className="mr-2 px-4 py-2 bg-gray-300 rounded-md"
                onClick={() => setShowConfirm(false)}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentFormEdit;
