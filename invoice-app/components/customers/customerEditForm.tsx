"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const CustomerEditForm: React.FC<{
  customer: { id: string; customerName: string; email: string };
}> = ({ customer }) => {
  const router = useRouter();
  const [form, setForm] = useState({
    customerName: customer.customerName || "",
    email: customer.email || "",
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setForm({ customerName: customer.customerName, email: customer.email });
  }, [customer]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleCancel = async (e: React.FormEvent) => {
    e.preventDefault();
    router.replace(`/dashboard/customers/${customer.id}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.customerName.trim() || !form.email.trim()) {
      alert("Customer name and email are required.");
      return;
    }

    try {
      const response = await fetch(`/api/customers/${customer.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Failed to update customer");

      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
        router.push("/dashboard/customers");
      }, 2000);
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-inherit py-10">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Edit Customer</h1>
        <form onSubmit={handleSubmit}>
          {/* Customer Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">
              Customer Name
            </label>
            <input
              type="text"
              name="customerName"
              value={form.customerName}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-between gap-4">
            <button
              type="submit"
              className="w-3/5 bg-blue-500 text-white font-semibold py-2 rounded-lg"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="w-2/5 bg-gray-400 text-white font-semibold py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-semibold text-green-600">
              Customer Updated!
            </h2>
            <p className="text-gray-700">You will be redirected shortly...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerEditForm;
