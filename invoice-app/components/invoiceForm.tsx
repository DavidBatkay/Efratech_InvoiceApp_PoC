"use client";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import React, { useState } from "react";

type LineItem = {
  description: string;
  quantity: number;
  unitPrice: number;
};

const InvoiceFormComponent: React.FC = () => {
  const [form, setForm] = useState({
    companyName: "",
    totalValue: 0,
    invoiceNumber: `INV-2024-${Date.now().toString().slice(-6)}`,
    dueDate: "",
    status: "PENDING",
    notes: "",
    lineItems: [
      {
        description: "",
        quantity: 1,
        unitPrice: 0,
      },
    ],
    user: null,
  });

  // Handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  // Handle Line Item change
  const handleLineItemChange = (
    index: number,
    name: string,
    value: string | number
  ) => {
    const updatedLineItems = [...form.lineItems];
    updatedLineItems[index] = { ...updatedLineItems[index], [name]: value };
    setForm((prevForm) => ({
      ...prevForm,
      lineItems: updatedLineItems,
    }));
  };

  // Add new line item
  const addLineItem = () => {
    setForm((prevForm) => ({
      ...prevForm,
      lineItems: [
        ...prevForm.lineItems,
        { description: "", quantity: 1, unitPrice: 0 },
      ],
    }));
  };

  // Calculate total value
  const calculateTotalValue = () => {
    return form.lineItems.reduce(
      (acc, item) => acc + item.quantity * item.unitPrice,
      0
    );
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Construct the data object based on the form state
      const invoiceData = {
        companyName: form.companyName,
        totalValue: calculateTotalValue(),
        invoiceNumber: form.invoiceNumber, // Auto-generated
        dueDate: new Date(form.dueDate), // Convert to Date object
        status: new Date(form.dueDate) < new Date() ? "OVERDUE" : "PENDING", // Logic for status
        notes: form.notes || null, // Notes are optional
        lineItems: {
          create: form.lineItems.map((item) => ({
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
          })),
        },
        user: null,
      };

      //create the invoice
      console.log();
      const newInvoice = await prisma.invoice.create({
        data: invoiceData,
      });
      console.log("Invoice created successfully:", newInvoice);
      redirect("/invoices");
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
            <label
              className="block text-gray-700 font-semibold mb-1"
              htmlFor="companyName"
            >
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={form.companyName}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>

          {/* Due Date */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-1"
              htmlFor="dueDate"
            >
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={form.dueDate}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>

          {/* Notes */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-1"
              htmlFor="notes"
            >
              Notes
            </label>
            <textarea
              id="notes"
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

          {/* Invoice Number (Non-editable) */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">
              Invoice Number
            </label>
            <p className="text-gray-700 font-medium">{form.invoiceNumber}</p>
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
    </div>
  );
};

export default InvoiceFormComponent;
