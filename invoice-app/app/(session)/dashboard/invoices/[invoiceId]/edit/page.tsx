import { notFound } from "next/navigation";
import { fetchInvoice } from "../page";
import InvoiceFormEdit from "@/components/invoiceFormEdit";
const InvoiceEditPage = async ({
  params,
}: {
  params: { invoiceId: string };
}) => {
  const invoice = await fetchInvoice(params.invoiceId);
  if (!invoice) notFound();
  return (
    <div className="relative p-4">
      <InvoiceFormEdit invoice={invoice} />
    </div>
  );
};

export default InvoiceEditPage;
