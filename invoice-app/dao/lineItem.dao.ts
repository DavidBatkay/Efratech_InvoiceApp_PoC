import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function createLineItem(data: Prisma.LineItemCreateInput) {
  return await prisma.lineItem.create({
    data,
  });
}

export async function updateLineItem(
  id: number,
  data: Prisma.LineItemUpdateInput
) {
  return await prisma.lineItem.update({
    where: { id },
    data,
  });
}

export async function deleteLineItem(id: number) {
  return await prisma.lineItem.delete({
    where: { id },
  });
}
