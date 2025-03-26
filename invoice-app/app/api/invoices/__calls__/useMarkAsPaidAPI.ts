export function useMarkAsPaidAPI() {
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

  return { markAsPaid };
}
