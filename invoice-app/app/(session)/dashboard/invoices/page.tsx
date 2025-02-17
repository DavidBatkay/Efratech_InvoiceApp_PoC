import { getInvoicesByUser } from "@/dao/invoice.dao";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import InvoiceList from "@/components/invoiceList"; // Create this component

const InvoicePage: React.FC = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return notFound();

  return (
    <div className="flex container mx-auto flex-col min-h-screen justify-center items-center">
      <InvoiceList userId={session.user.user_id} />
    </div>
  );
};

export default InvoicePage;
