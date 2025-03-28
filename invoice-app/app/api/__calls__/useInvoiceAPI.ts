import { useCallback } from "react";

export function useInvoiceAPI() {
  const createInvoice = async (data: {
    customerId: number;
    dueDate: string;
    status: string;
    notes?: string | null;
    lineItems: { description: string; quantity: number; unitPrice: number }[];
    invoiceNumber: string;
  }) => {
    try {
      const response = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse?.error || "Failed to create the invoice");
      }

      return response.json();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      return { error: errorMessage };
    }
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
  const fetchInvoice = useCallback(async (invoiceId: string) => {
    try {
      const response = await fetch(`/api/invoices/${invoiceId}`);

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse?.error || "Failed to fetch invoice");
      }

      return response.json();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      console.error("Error fetching invoice: ", errorMessage);
      return { error: errorMessage };
    }
  }, []);

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

  const markAsPaid = async (
    invoiceId: number
  ): Promise<{ message?: string; error?: string }> => {
    try {
      const response = await fetch("/api/invoices/markAsPaid", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ invoiceId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to mark invoice as paid");
      }

      return { message: data.message };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      console.error("Error marking invoice as paid:", errorMessage);
      return { error: errorMessage };
    }
  };

  return {
    fetchInvoice,
    createInvoice,
    fetchInvoices,
    deleteInvoice,
    updateInvoice,
    markAsPaid,
  };
}
