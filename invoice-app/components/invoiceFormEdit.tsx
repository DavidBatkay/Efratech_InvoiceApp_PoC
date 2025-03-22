"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CustomerSelect from "./customers/customerSelect";
interface Invoice {
  id: number;
  customerId: number | null;
  totalValue: number;
  invoiceNumber: string;
  dueDate: Date;
  status: string;
  notes: string | null;
  lineItems: { description: string; quantity: number; unitPrice: number }[];
}

const InvoiceFormEdit: React.FC<{ invoice: Invoice }> = ({ invoice }) => {
  const router = useRouter();
  const [form, setForm] = useState(invoice);
  const [error, setError] = useState(false);
  const [confirmUpdate, setConfirmUpdate] = useState(false);
  const isPaid = invoice.status === "PAID";
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
    if (!isPaid)
      setForm((prevForm) => ({
        ...prevForm,
        lineItems: [
          ...prevForm.lineItems,
          { description: "", quantity: 1, unitPrice: 0 },
        ],
      }));
  };

  const removeLineItem = (index: number) => {
    if (form.lineItems.length > 1 && !isPaid) {
      setForm((prevForm) => ({
        ...prevForm,
        lineItems: prevForm.lineItems.filter((_, i) => i !== index),
      }));
    }
  };

  const calculateTotalValue = () => {
    return form.lineItems.reduce(
      (acc, item) => acc + item.quantity * item.unitPrice,
      0
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmUpdate(true);
  };

  const confirmSubmit = async () => {
    try {
      if (isPaid) throw new Error("Paid invoices cannot be edited");
      const updatedInvoice = {
        customerId: form.customerId,
        totalValue: calculateTotalValue(),
        invoiceNumber: form.invoiceNumber,
        dueDate: new Date(form.dueDate).toISOString(), // Ensure it's a valid date
        status: new Date(form.dueDate) < new Date() ? "OVERDUE" : "PENDING",
        notes: form.notes || null,
        lineItems: form.lineItems.map((item) => ({
          description: item.description,
          quantity: Number(item.quantity), // Ensure numbers are sent
          unitPrice: Number(item.unitPrice),
        })),
      };

      const response = await fetch(`/api/invoices/${invoice.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedInvoice),
      });

      if (!response.ok) setError(true);

      setTimeout(() => {
        setError(false);
        router.push(`/dashboard/invoices/${invoice.id}`);
      }, 2000);
    } catch (error) {
      console.error("Error updating invoice:", error);
    }
  };

  const formattedDueDate = form.dueDate
    ? new Date(form.dueDate).toISOString().split("T")[0]
    : "";

  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-inherit py-10">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Edit Invoice #{invoice.invoiceNumber}
        </h1>

        <form onSubmit={handleSubmit}>
          <CustomerSelect
            selectedCustomerId={
              form.customerId ? form.customerId.toString() : null
            }
            setCustomerId={(customerId) =>
              setForm((prevForm) => ({
                ...prevForm,
                customerId: Number(customerId),
              }))
            }
            disabled={isPaid}
          />

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">
              Due Date
            </label>
            <input
              disabled={isPaid}
              type="date"
              name="dueDate"
              value={formattedDueDate}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">
              Notes
            </label>
            <textarea
              disabled={isPaid}
              name="notes"
              value={form.notes || ""}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-4 py-2"
              rows={3}
            />
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Services
            </h2>
            {form.lineItems.map((item, index) => (
              <div
                key={index}
                className="grid gap-4 mb-2 items-center grid-cols-1 md:grid-cols-[auto_auto_auto_auto]"
              >
                <div className="md:flex grid-cols-1">
                  <hr className="my-2" />
                  {form.lineItems.length > 1 && (
                    <button
                      hidden={isPaid}
                      type="button"
                      onClick={() => removeLineItem(index)}
                      className="text-red-500 text-lg"
                    >
                      ×
                    </button>
                  )}

                  {/* Description */}
                  <input
                    disabled={isPaid}
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
                  disabled={isPaid}
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
                  disabled={isPaid}
                  type="number"
                  placeholder="Unit Price"
                  value={item.unitPrice}
                  onChange={(e) =>
                    handleLineItemChange(index, "unitPrice", e.target.value)
                  }
                  className="w-full border rounded-lg px-4 py-2"
                  step="0.01"
                  min="0.01"
                  required
                />
              </div>
            ))}
            <button
              disabled={isPaid}
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

          <div className="mt-6 flex gap-4">
            <button
              disabled={isPaid}
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg"
            >
              Update Invoice
            </button>
            <button
              type="button"
              onClick={() => router.push(`/dashboard/invoices/${invoice.id}`)}
              className="bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {confirmUpdate && !isPaid && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          {error ? (
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              Failed to update invoice
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-xl font-semibold text-gray-800">
                Confirm Update
              </h2>
              <p className="text-gray-700">
                Are you sure you want to update this invoice?
              </p>

              <div className="mt-4 flex justify-center gap-4">
                <button
                  disabled={isPaid}
                  onClick={confirmSubmit}
                  className="bg-green-500 text-white py-2 px-4 rounded-lg"
                >
                  Confirm
                </button>
                <button
                  disabled={isPaid}
                  onClick={() => setConfirmUpdate(false)}
                  className="bg-gray-400 text-white py-2 px-4 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InvoiceFormEdit;
