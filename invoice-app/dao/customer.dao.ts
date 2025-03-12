import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
export async function getCustomerById(id: number) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.user_id) return null;
  return await prisma.customer.findFirst({
    where: { id, user_id: session.user.user_id },
  });
}
