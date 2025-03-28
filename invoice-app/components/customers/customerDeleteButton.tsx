"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useCustomerAPI } from "@/app/api/__calls__/useCustomerAPI";
const CustomerDeleteButton: React.FC<{ customerId: number }> = ({
  customerId,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const { deleteCustomer } = useCustomerAPI();
  const router = useRouter();
  const handleDelete = async () => {
    setIsDeleting(true);
    setMessage(""); // Reset message

    try {
      const response = await deleteCustomer(customerId);

      if (response.error) {
        throw new Error(response.error);
      }

      setMessage("Customer deleted successfully!");
      setTimeout(() => router.push("/dashboard/customers"), 2000); // Reload after success
    } catch (error) {
      console.error("Error deleting customer:", error);
      setMessage("An error occurred while deleting the customer.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => setShowModal(true)}
      >
        Delete
      </Button>

      {showModal && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
          <div className="bg-white p-4 rounded-md shadow-md text-center w-64">
            {message ? (
              <>
                <h2 className="text-lg font-semibold text-gray-800">
                  {message}
                </h2>
              </>
            ) : (
              <>
                <h2 className="text-lg font-semibold text-gray-800">
                  Are you sure you want to delete this customer?
                </h2>
                <div className="flex justify-center mt-4 space-x-4">
                  <Button
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Deleting..." : "Yes, Delete"}
                  </Button>
                  <Button onClick={() => setShowModal(false)}>Cancel</Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerDeleteButton;
