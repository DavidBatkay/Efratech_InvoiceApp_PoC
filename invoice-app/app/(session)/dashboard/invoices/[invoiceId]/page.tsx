import { getInvoiceById } from "@/dao/invoice.dao";
import { notFound } from "next/navigation";
import InvoiceDetails from "@/components/invoiceDetails";
import Link from "next/link";
import Image from "next/image";
const InvoiceIdPage = async ({ params }: { params: { invoiceId: string } }) => {
  const invoice = await fetchInvoice(params.invoiceId);
  if (!invoice) notFound();

  return (
    <div className="relative p-4">
      {/* Invoice Details */}
      <InvoiceDetails invoice={invoice} />
    </div>
  );
};

export default InvoiceIdPage;

// NOTE Helper function for fetching and validating invoice
const fetchInvoice = async (invoiceIdParam: string) => {
  const invoiceId = Number(invoiceIdParam);
  if (isNaN(invoiceId)) return null;
  return await getInvoiceById(invoiceId);
};
