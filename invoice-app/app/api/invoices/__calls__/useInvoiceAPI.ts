import { useCallback } from "react";

export function useInvoiceAPI() {
  const createInvoice = async (data: {
    customerId: number;
    dueDate: string;
    status: string;
    notes?: string;
    lineItems: { description: string; quantity: number; unitPrice: number }[];
    invoiceNumber: string;
  }) => {
    const response = await fetch("/api/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  };

  const deleteInvoice = async (invoiceId: number) => {
    const response = await fetch(`/api/invoices`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ invoiceId }),
    });

    if (!response.ok) throw new Error("Failed to delete invoice");
    return response;
  };

  const fetchInvoices = useCallback(
    async (
      sortOrder: "asc" | "desc" = "desc",
      filter: "all" | "archived" | string = "all"
    ) => {
      const response = await fetch(
        `/api/invoices?sortOrder=${sortOrder}&filter=${filter}`
      );
      return response.json();
    },
    []
  );

  const updateInvoice = useCallback(
    async (invoiceId: number, updatedData: InvoiceUpdateData) => {
      try {
        // Making the PUT request
        const response = await fetch(`/api/invoices/${invoiceId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        });

        // Check if the response is OK
        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(
            errorResponse?.error || "Failed to update the invoice"
          );
        }

        // If everything goes well, return the updated invoice
        const updatedInvoice = await response.json();
        return updatedInvoice;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred";
        console.error("Error updating invoice: ", errorMessage);
        return { error: errorMessage };
      }
    },
    []
  );

  return { createInvoice, fetchInvoices, deleteInvoice, updateInvoice };
}
