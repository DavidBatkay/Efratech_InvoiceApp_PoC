import { Prisma, User } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function createInvoice(data: Prisma.InvoiceCreateInput) {
  return await prisma.invoice.create({
    data,
  });
}

export async function getInvoiceById(id: number) {
  return await prisma.invoice.findUnique({
    where: { id },
    include: { lineItems: true },
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
