"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const CustomerCreateForm: React.FC = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    customerName: "",
    email: "",
  });
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.customerName.trim() || !form.email.trim()) {
      alert("Customer name and email are required.");
      return;
    }

    try {
      const response = await fetch("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Failed to create customer");

      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
        router.push("/dashboard/customers");
      }, 2000);
    } catch (error) {
      console.error("Error creating customer:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-inherit py-10">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Create New Customer
        </h1>
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
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg"
            >
              Create Customer
            </button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-semibold text-green-600">
              Customer Created!
            </h2>
            <p className="text-gray-700">You will be redirected shortly...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerCreateForm;
