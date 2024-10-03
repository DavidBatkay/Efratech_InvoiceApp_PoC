import { prisma } from "@/lib/prisma";

const InvoicePage: React.FC = async () => {
  const invoices = [
    { id: 123, name: "Microsoft Invoice" },
    { id: 124, name: "Luxoft Invoice" },
  ]; //await prisma.post.findMany(); BUG gives error, idk

  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <ul className="flex flex-col gap-y-2">
        {invoices.map((invoice: any) => (
          <li key={invoice.id}>{invoice.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default InvoicePage;
