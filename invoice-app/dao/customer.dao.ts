import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
export async function getCustomerById(id: number) {
  const session = await auth();

  if (!session || !session.user?.user_id) return null;
  return await prisma.customer.findFirst({
    where: { id, user_id: session.user.user_id },
  });
}
