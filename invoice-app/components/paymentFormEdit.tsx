"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePaymentAPI } from "@/app/api/__calls__/usePaymentAPI";

const PaymentFormEdit = ({ paymentId }: { paymentId: string }) => {
  const { fetchPayment, updatePaymentNotes } = usePaymentAPI();
  const [payment, setPayment] = useState<{
    id: number;
    notes: string | null;
  } | null>(null);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [buttonMessage, setButtonMessage] = useState("Save Changes");
  const router = useRouter();

  useEffect(() => {
    const loadPayment = async () => {
      const data = await fetchPayment(paymentId);
      if (!data.error) {
        setPayment(data);
        setNotes(data.notes || "");
      } else {
        console.error("Error loading payment:", data.error);
      }
    };

    loadPayment();
  }, [paymentId, fetchPayment]);

  const handleSubmit = async () => {
    if (!payment) return;

    setIsSubmitting(true);
    setButtonMessage("Saving Changes...");
    try {
      const response = await updatePaymentNotes(payment.id, notes);
      if (response.error) throw new Error(response.error);
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

  if (!payment) {
    return <p className="text-white">Loading payment data...</p>;
  }

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
