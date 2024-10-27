import CreateInvoiceButton from "@/components/createInvoice";
import Invoice from "@/components/invoice";
import { getAllInvoices } from "@/dao/invoice.dao";
const InvoicePage: React.FC = async () => {
  const invoices = await getAllInvoices(); //NOTE fixed
  return (
    <div className="flex container mx-auto flex-col min-h-screen justify-center items-center">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
        <li>
          <CreateInvoiceButton />
        </li>
        {invoices.map((invoice: any) => (
          <li key={invoice.id}>
            <Invoice
              invoiceId={invoice.id}
              invoiceTitle={invoice.companyName}
              invoiceTotalValue={invoice.totalValue}
              invoiceStatus={invoice.status}
            ></Invoice>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvoicePage;
