import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import InvoiceList from "@/components/invoiceList";

const PaymentsPage: React.FC = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return <p>Unauthorized</p>;

  return (
    <div className="container mx-auto pt-4">
      <InvoiceList
        userId={session.user.user_id}
        fetchUrl="/api/pendingInvoices"
      />
    </div>
  );
};

export default PaymentsPage;
