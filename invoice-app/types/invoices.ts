type LineItem = {
  description: string;
  quantity: number;
  unitPrice: number;
};

type InvoiceUpdateData = {
  customerId: number | null;
  totalValue: number;
  invoiceNumber: string;
  dueDate: string; // ISO string format
  status: string;
  notes: string | null;
  lineItems: LineItem[];
};
