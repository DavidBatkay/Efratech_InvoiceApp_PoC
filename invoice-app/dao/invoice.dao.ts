import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
export async function createInvoice(data: Prisma.InvoiceCreateInput) {
  return await prisma.invoice.create({
    data,
  });
}

export async function getInvoiceById(id: number) {
  const session = await auth();

  if (!session || !session.user?.user_id) return null;
  return await prisma.invoice.findFirst({
    where: { id, user_id: session.user.user_id },
    include: { lineItems: true, customer: true },
  });
}

export async function getAllInvoices() {
  return await prisma.invoice.findMany({
    include: { lineItems: true },
  });
}

export async function getInvoicesByUser(
  user_id: number,
  sortOrder: "asc" | "desc" = "desc"
) {
  return await prisma.invoice.findMany({
    where: { user_id: user_id },
    include: { lineItems: true },
    orderBy: { createdAt: sortOrder }, // Dynamic sorting
  });
}

export async function updateInvoice(
  id: number,
  data: Prisma.InvoiceUpdateInput
) {
  return await prisma.invoice.update({
    where: { id },
    data,
  });
}

export async function deleteInvoice(id: number) {
  return await prisma.invoice.delete({
    where: { id },
  });
}
