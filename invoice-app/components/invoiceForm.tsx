"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CustomerSelect from "./customers/customerSelect";
import { useInvoiceAPI } from "@/app/api/__calls__/useInvoiceAPI";
const InvoiceFormComponent: React.FC = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    customerId: "",
    totalValue: 0,
    invoiceNumber: `INV-${new Date().getFullYear()}-${Date.now()
      .toString()
      .slice(-6)}-${Math.floor(Math.random() * 1000)}`,
    dueDate: "",
    status: "PENDING",
    notes: "",
    lineItems: [{ description: "", quantity: "", unitPrice: "" }],
  });
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { createInvoice } = useInvoiceAPI();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };
  const handleLineItemChange = (index: number, name: string, value: string) => {
    const updatedLineItems = [...form.lineItems];
    updatedLineItems[index] = { ...updatedLineItems[index], [name]: value };
    setForm((prevForm) => ({ ...prevForm, lineItems: updatedLineItems }));
  };

  const addLineItem = () => {
    setForm((prevForm) => ({
      ...prevForm,
      lineItems: [
        ...prevForm.lineItems,
        { description: "", quantity: "", unitPrice: "" },
      ],
    }));
  };

  const removeLineItem = (index: number) => {
    if (form.lineItems.length > 1) {
      setForm((prevForm) => ({
        ...prevForm,
        lineItems: prevForm.lineItems.filter((_, i) => i !== index),
      }));
    }
  };

  const calculateTotalValue = () => {
    return form.lineItems.reduce(
      (acc, item) =>
        acc + (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0),
      0
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure there is at least one valid line item
    if (
      !form.lineItems.length ||
      form.lineItems.some(
        (item) =>
          !item.description.trim() ||
          !item.quantity ||
          Number(item.quantity) <= 0 ||
          !item.unitPrice ||
          Number(item.unitPrice) < 0
      )
    ) {
      alert("Each service must have a description, valid quantity, and price.");
      return;
    }

    try {
      const invoiceData = {
        customerId: Number(form.customerId),
        totalValue: calculateTotalValue(),
        invoiceNumber: form.invoiceNumber,
        dueDate: form.dueDate,
        status: new Date(form.dueDate) < new Date() ? "OVERDUE" : "PENDING",
        notes: form.notes || null,
        lineItems: form.lineItems.map((item) => ({
          ...item,
          quantity: Number(item.quantity),
          unitPrice: Number(item.unitPrice),
        })),
      };
      const response = await createInvoice(invoiceData);

      if (response.error) {
        throw new Error(response.error || "Failed to create invoice"); // Use API error message
      }

      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
        router.push("/dashboard/invoices");
      }, 2000);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message); // Set error message from API
      } else {
        setError("An unexpected error occurred.");
      }
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
        setError(null);
      }, 2000);
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
          <CustomerSelect
            setCustomerId={(id) =>
              setForm((prev) => ({ ...prev, customerId: id }))
            }
          />

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

          {/* Services Section */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Services
            </h2>
            {form.lineItems.map((item, index) => (
              <div
                key={index}
                className={`grid gap-4 mb-2 items-center grid-cols-1 md:grid-cols-[auto_auto_auto_auto]`}
              >
                <div className="flex gap-2">
                  {/* Remove Button */}
                  {form.lineItems.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeLineItem(index)}
                      className="text-red-500 text-lg"
                    >
                      ×
                    </button>
                  )}
                  {/* Description */}
                  <input
                    type="text"
                    placeholder="Service Description"
                    value={item.description}
                    onChange={(e) =>
                      handleLineItemChange(index, "description", e.target.value)
                    }
                    className="w-full border rounded-lg px-4 py-2"
                    required
                  />
                </div>
                {/* Quantity */}
                <input
                  type="number"
                  placeholder="Qty"
                  value={item.quantity}
                  onChange={(e) =>
                    handleLineItemChange(index, "quantity", e.target.value)
                  }
                  className="w-full border rounded-lg px-4 py-2"
                  min="1"
                  required
                />
                {/* Unit Price */}
                <input
                  type="number"
                  placeholder="Unit Price"
                  value={item.unitPrice}
                  onChange={(e) =>
                    handleLineItemChange(index, "unitPrice", e.target.value)
                  }
                  className="w-full border rounded-lg px-4 py-2"
                  step="0.01"
                  min="0"
                  required
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addLineItem}
              className="text-blue-500 hover:underline text-sm"
            >
              + Add Service
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
            {error ? (
              <>
                <h2 className="text-xl font-semibold text-red-600">
                  Error creating invoice!
                </h2>
                <p className="text-gray-700">{error}</p>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-green-600">
                  Invoice Created!
                </h2>
                <p className="text-gray-700">
                  You will be redirected shortly...
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceFormComponent;
