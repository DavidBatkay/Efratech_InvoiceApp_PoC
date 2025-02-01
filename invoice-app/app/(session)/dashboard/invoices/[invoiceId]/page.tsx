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
      {/* Back Button */}
      <div className="fixed ml-20 -mt-16 sm:mt-12 sm:ml-20">
        <Link href="/dashboard/invoices">
          <Image
            className="bg-slate-200 rounded-full p-1"
            src="https://cdn-icons-png.flaticon.com/512/3545/3545314.png"
            alt="Back"
            width={40}
            height={40}
          />
        </Link>
      </div>

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
