export function useCustomerAPI() {
  const createCustomer = async (form: {
    customerName: string;
    email: string;
  }) => {
    try {
      const response = await fetch("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse?.error || "Failed to create customer");
      }

      return response.json();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      return { error: errorMessage };
    }
  };
  const deleteCustomer = async (customerId: number) => {
    try {
      const response = await fetch(`/api/customers/${customerId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete customer");
      }

      return response.json();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      console.error("Error updating invoice: ", errorMessage);
      return { error: errorMessage };
    }
  };
  const updateCustomer = async (
    customerId: number,
    formData: { customerName: string; email: string }
  ) => {
    try {
      const response = await fetch(`/api/customers/${customerId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update customer");
      return response.json();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      console.error("Error updating customer: ", errorMessage);
      return { error: errorMessage };
    }
  };
  return { createCustomer, deleteCustomer, updateCustomer };
}
