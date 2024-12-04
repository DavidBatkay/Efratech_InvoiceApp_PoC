import { getInvoiceById } from "@/dao/invoice.dao";
import { notFound } from "next/navigation";
import InvoiceDetails from "@/components/invoiceDetails";
import Link from "next/link";
const InvoiceIdPage: React.FC<{ params: any }> = async ({ params }) => {
  const { invoiceId } = params;
  const invoice = await getInvoiceById(parseInt(invoiceId));
  if (!invoice || invoice === null) {
    notFound();
  }

  return (
    <div className="">
      <div className="fixed ml-20 -mt-16 sm:mt-12 sm:ml-20">
        <button>
          <Link className="w-1 h-1" href={"/dashboard/invoices"}>
            <img
              className="bg-slate-200 rounded-3xl"
              src="https://cdn-icons-png.flaticon.com/512/3545/3545314.png"
              alt="back arrow"
              width={40}
              height={40}
            />
          </Link>
        </button>
      </div>

      <InvoiceDetails invoice={invoice}></InvoiceDetails>
    </div>
  );
};

export default InvoiceIdPage;
