"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const InvoiceFormComponent: React.FC = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    companyName: "",
    totalValue: 0,
    invoiceNumber: `INV-${new Date().getFullYear()}-${Date.now()
      .toString()
      .slice(-6)}-${Math.floor(Math.random() * 1000)}`,
    dueDate: "",
    status: "PENDING",
    notes: "",
    lineItems: [{ description: "", quantity: 1, unitPrice: 0 }],
    user: null,
  });
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleLineItemChange = (
    index: number,
    name: string,
    value: string | number
  ) => {
    const updatedLineItems = [...form.lineItems];
    updatedLineItems[index] = { ...updatedLineItems[index], [name]: value };
    setForm((prevForm) => ({ ...prevForm, lineItems: updatedLineItems }));
  };

  const addLineItem = () => {
    setForm((prevForm) => ({
      ...prevForm,
      lineItems: [
        ...prevForm.lineItems,
        { description: "", quantity: 1, unitPrice: 0 },
      ],
    }));
  };

  const calculateTotalValue = () => {
    return form.lineItems.reduce(
      (acc, item) => acc + item.quantity * item.unitPrice,
      0
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const invoiceData = {
        companyName: form.companyName,
        totalValue: calculateTotalValue(),
        invoiceNumber: form.invoiceNumber,
        dueDate: form.dueDate,
        status: new Date(form.dueDate) < new Date() ? "OVERDUE" : "PENDING",
        notes: form.notes || null,
        lineItems: form.lineItems,
      };

      const response = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invoiceData),
      });

      if (!response.ok) throw new Error("Failed to create invoice");

      setShowModal(true); // Show modal

      setTimeout(() => {
        setShowModal(false);
        router.push("/dashboard/invoices"); // Redirect after modal disappears
      }, 2000);
    } catch (error) {
      console.error("Error creating invoice:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-inherit py-10">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Create New Invoice
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Company Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              value={form.companyName}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>

          {/* Due Date */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>

          {/* Notes */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">
              Notes
            </label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-4 py-2"
              rows={3}
            />
          </div>

          {/* Line Items */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Line Items
            </h2>
            {form.lineItems.map((item, index) => (
              <div key={index} className="flex space-x-4 mb-2">
                <input
                  type="text"
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) =>
                    handleLineItemChange(index, "description", e.target.value)
                  }
                  className="w-full border rounded-lg px-4 py-2"
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  value={item.quantity}
                  onChange={(e) =>
                    handleLineItemChange(index, "quantity", +e.target.value)
                  }
                  className="w-1/3 border rounded-lg px-4 py-2"
                  min="1"
                />
                <input
                  type="number"
                  placeholder="Unit Price"
                  value={item.unitPrice}
                  onChange={(e) =>
                    handleLineItemChange(index, "unitPrice", +e.target.value)
                  }
                  className="w-1/3 border rounded-lg px-4 py-2"
                  step="0.01"
                  min="0"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addLineItem}
              className="text-blue-500 hover:underline text-sm"
            >
              + Add Line Item
            </button>
          </div>

          {/* Display Total Value */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">
              Total Value
            </label>
            <p className="text-gray-700 font-medium">
              ${calculateTotalValue().toFixed(2)}
            </p>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg"
            >
              Create Invoice
            </button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-semibold text-green-600">
              Invoice Created!
            </h2>
            <p className="text-gray-700">You will be redirected shortly...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceFormComponent;
