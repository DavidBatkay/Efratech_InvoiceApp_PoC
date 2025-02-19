import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
const PaymentsPage: React.FC = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return <p>Unauthorized</p>;

  return <div className="container mx-auto pt-4"></div>;
};

export default PaymentsPage;
