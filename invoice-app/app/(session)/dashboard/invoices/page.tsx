import Invoice from "@/components/invoice";
import { getAllInvoices } from "@/dao/invoice.dao";
const InvoicePage: React.FC = async () => {
  // const invoices = [
  //   { id: 123, name: "Microsoft Invoice" },
  //   { id: 124, name: "Luxoft Invoice" },
  // ];

  const invoices = await getAllInvoices(); // BUG gives error, idk
  console.log(invoices);
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <ul className="grid flex-col gap-y-2">
        {invoices.map((invoice: any) => (
          <li key={invoice.id}>
            <Invoice
              invoiceId={invoice.id}
              invoiceTitle={invoice.companyName}
            ></Invoice>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvoicePage;
