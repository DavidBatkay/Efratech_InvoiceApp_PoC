import { useCallback } from "react";

export function usePaymentAPI() {
  const updatePaymentNotes = async (paymentId: number, notes: string) => {
    try {
      const response = await fetch(`/api/payments/edit/${paymentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notes }),
      });

      if (!response.ok) {
        throw new Error("Failed to update payment");
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating payment:", error);
      return {
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  };
  const fetchPayments = useCallback(
    async (sortBy?: string, sortOrder?: string) => {
      const url =
        sortBy && sortOrder
          ? `/api/payments?sortBy=${sortBy}&sortOrder=${sortOrder}`
          : `/api/payments`;

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch payments");

        return await res.json();
      } catch (error) {
        console.error("Error fetching payments:", error);
        return {
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    },
    []
  );
  const fetchPayment = useCallback(async (paymentId: string) => {
    try {
      const response = await fetch(`/api/payments/${paymentId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch payment");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching payment:", error);
      return {
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }, []);

  return { updatePaymentNotes, fetchPayments, fetchPayment };
}
