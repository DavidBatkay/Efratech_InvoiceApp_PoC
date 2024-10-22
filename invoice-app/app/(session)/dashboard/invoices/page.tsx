import prisma from "@/lib/prisma";
import Invoice from "@/components/invoice";
const InvoicePage: React.FC = async () => {
  const invoices = [
    { id: 123, name: "Microsoft Invoice" },
    { id: 124, name: "Luxoft Invoice" },
  ]; //await prisma.post.findMany(); BUG gives error, idk

  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <ul className="grid flex-col gap-y-2">
        {invoices.map((invoice: any) => (
          <li key={invoice.id}>
            <Invoice
              invoiceId={invoice.id}
              invoiceTitle={invoice.name}
            ></Invoice>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvoicePage;
