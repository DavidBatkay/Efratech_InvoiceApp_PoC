import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import InvoiceList from "@/components/invoiceList";

const InvoicePage: React.FC = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return notFound();

  return (
    <div className="flex container mx-auto flex-col min-h-screen justify-center items-center pt-4">
      <InvoiceList userId={session.user.user_id} fetchUrl="/api/invoices" />
    </div>
  );
};

export default InvoicePage;
