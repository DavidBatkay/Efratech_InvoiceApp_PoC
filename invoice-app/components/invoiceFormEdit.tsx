"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Invoice {
  id: number;
  companyName: string;
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
      const updatedInvoice = {
        companyName: form.companyName,
        totalValue: calculateTotalValue(),
        invoiceNumber: form.invoiceNumber,
        dueDate: form.dueDate,
        status: new Date(form.dueDate) < new Date() ? "OVERDUE" : "PENDING",
        notes: form.notes || null,
        lineItems: form.lineItems,
      };

      const response = await fetch(`/api/invoices/${invoice.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedInvoice),
      });

      if (!response.ok) throw new Error("Failed to update invoice");

      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
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

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">
              Due Date
            </label>
            <input
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
              name="notes"
              value={form.notes || ""}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-4 py-2"
              rows={3}
            />
          </div>

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

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-semibold text-green-600">
              Invoice Updated!
            </h2>
            <p className="text-gray-700">You will be redirected shortly...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceFormEdit;
