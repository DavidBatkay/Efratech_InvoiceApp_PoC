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
  const [buttonMessage, setButtonMessage] = useState("Save Changes");
  const router = useRouter();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setButtonMessage("Saving Changes...");
    try {
      await fetch(`/api/payments/edit/${payment.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }),
      });
      router.refresh(); // Ensure fresh data
    } catch (error) {
      console.error("Failed to update payment", error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setButtonMessage("Changes Saved!");
        setTimeout(() => {
          setButtonMessage("Save Changes");
        }, 1000);
      }, 1000);
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
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {buttonMessage}
        </button>
        <Link href="/dashboard/payments">
          <button className="mt-2 bg-gray-500 text-white px-4 py-2 rounded-md">
            Go back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentFormEdit;
