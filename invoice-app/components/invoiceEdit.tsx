"use client";
import { useInvoiceAPI } from "@/app/api/__calls__/useInvoiceAPI";
import InvoiceFormEdit from "@/components/invoiceFormEdit";
import { useEffect, useState } from "react";
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

const InvoiceEdit = ({ invoiceId }: { invoiceId: string }) => {
  const { fetchInvoice } = useInvoiceAPI();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const loadInvoice = async () => {
      const data = await fetchInvoice(invoiceId);

      if (data.error) {
        console.log(data.error);
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
      setLoading(false); // Set loading to false once data is loaded
    };

    loadInvoice();
  }, [invoiceId, fetchInvoice]);

  if (loading) {
    return <div></div>;
  }

  if (!invoice) {
    console.log("Invoice not found");
    return <></>;
  }

  return <InvoiceFormEdit invoice={invoice} />;
};

export default InvoiceEdit;
