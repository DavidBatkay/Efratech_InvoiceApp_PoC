"use client";
import React, { useEffect, useState } from "react";
import BackButton from "./buttons/backButton";
import EditButton from "./buttons/editButton";
import DeleteInvoiceButton from "./buttons/deleteButton";
import MarkAsPaidButton from "./buttons/markAsPaidButton";
import CustomerDetailsAnchor from "./customers/customerDetailsAnchor";
import { Customer, InvoiceStatus } from "@prisma/client";
type LineItem = {
  id: number;
  description: string;
  quantity: number;
  unitPrice: number;
  invoiceId: number;
};

type Invoice = {
  id: number;
  customer?: Customer | null;
  customerId: number | null; // New field
  customerName: string | null; // New field
  customerEmail: string | null; // New field
  dateOfCreation: Date;
  invoiceNumber: string;
  dueDate: Date;
  status: InvoiceStatus;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
  totalValue: number;
  lineItems: LineItem[];
};

import { useInvoiceAPI } from "@/app/api/__calls__/useInvoiceAPI";
import { notFound } from "next/navigation";
import Invoice from "./invoice";
const InvoiceComponent: React.FC<{ invoiceId: string }> = ({ invoiceId }) => {
  const { fetchInvoice } = useInvoiceAPI();
  const [invoice, setInvoice] = useState<Invoice | null>(null);

  useEffect(() => {
    const loadInvoice = async () => {
      const data = await fetchInvoice(invoiceId);

      if (data.error) {
        notFound();
      } else {
        // Ensure that date fields are parsed into Date objects
        const invoiceData = {
          ...data,
          dueDate: new Date(data.dueDate),
          createdAt: new Date(data.createdAt),
          updatedAt: new Date(data.updatedAt),
          dateOfCreation: new Date(data.dateOfCreation),
        };
        setInvoice(invoiceData);
      }
    };

    loadInvoice();
  }, [invoiceId, fetchInvoice]);

  return (
    invoice && (
      <>
        <BackButton />

        <div className="flex flex-col min-h-screen justify-center items-center bg-inherit py-10">
          <div className="flex justify-between w-full max-w-3xl py-3">
            <EditButton invoiceId={invoice.id} invoiceStatus={invoice.status} />
            <DeleteInvoiceButton
              invoiceId={invoice.id}
              invoiceStatus={invoice.status}
            />
          </div>
          <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Invoice</h1>

            {/* Invoice Header */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <div className="text-lg text-gray-600">
                  <p className="font-semibold">Invoice #:</p>
                  {invoice.invoiceNumber}
                </div>
                <div className="text-lg text-gray-600">
                  <p className="font-semibold text-right">Status:</p>
                  <span
                    className={`px-2 py-1 rounded-full ${
                      invoice.status === InvoiceStatus.PAID
                        ? "bg-green-100 text-green-600"
                        : invoice.status === InvoiceStatus.PENDING
                        ? "bg-yellow-100 text-yellow-600"
                        : invoice.status === InvoiceStatus.ARCHIVED
                        ? "bg-blue-100 text-blue-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {invoice.status === InvoiceStatus.ARCHIVED
                      ? "PAID & ARCHIVED"
                      : invoice.status}
                  </span>
                </div>
              </div>

              <div className="text-sm text-gray-500">
                <p>
                  Customer: <CustomerDetailsAnchor invoice={invoice} />
                </p>
                <p>
                  Email:{" "}
                  {invoice.customer?.email
                    ? invoice.customer?.email
                    : invoice.customerEmail}
                </p>
                <p>
                  Date of Creation:{" "}
                  {invoice.dateOfCreation.toLocaleDateString()}
                </p>
                <p>Due Date: {invoice.dueDate.toLocaleDateString()}</p>
              </div>
            </div>

            {/* Notes */}
            {invoice.notes && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-700">Notes:</h2>
                <p className="text-sm text-gray-500">{invoice.notes}</p>
              </div>
            )}

            {/* Line Items */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Services
              </h2>
              <div className="space-y-4">
                {invoice.lineItems.map((lineItem) => (
                  <div
                    key={lineItem.id}
                    className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm"
                  >
                    <div>
                      <p className="font-medium text-gray-700">
                        {lineItem.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-600">
                        Quantity: {lineItem.quantity}
                      </p>
                      <p className="text-gray-600">
                        Unit Price: ${lineItem.unitPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer with timestamps and total value */}
            <div className="flex justify-between items-center border-t pt-4 text-sm text-gray-500">
              {/* Left side: Created & Updated timestamps */}
              <div>
                <p>Created at: {invoice.createdAt.toLocaleDateString()}</p>
                <p>Updated at: {invoice.updatedAt.toLocaleDateString()}</p>
              </div>

              {/* Right side: Total */}
              <div className="text-right">
                <p className="font-semibold">Total:</p>
                <p className="font-bold text-lg">{invoice.totalValue} $</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <MarkAsPaidButton
            invoiceId={invoice.id}
            invoiceStatus={invoice.status}
          />
        </div>
      </>
    )
  );
};

export default InvoiceComponent;
