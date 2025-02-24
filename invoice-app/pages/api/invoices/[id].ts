import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { LineItem } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: "Invalid invoice ID" });
  }

  if (req.method === "PUT") {
    try {
      const existingInvoice = await prisma.invoice.findUnique({
        where: { id: Number(id) },
      });

      if (!existingInvoice) {
        return res.status(404).json({ error: "Invoice not found" });
      }

      if (
        existingInvoice.status === "PAID" ||
        existingInvoice.status === "ARCHIVED"
      ) {
        return res
          .status(403)
          .json({ error: "Paid or Archived invoices cannot be edited" });
      }

      const { companyName, dueDate, status, notes, lineItems, invoiceNumber } =
        req.body;

      const updatedInvoice = await prisma.invoice.update({
        where: { id: Number(id) },
        data: {
          companyName,
          totalValue: lineItems.reduce(
            (acc: any, item: any) => acc + item.quantity * item.unitPrice,
            0
          ),
          invoiceNumber,
          dueDate: new Date(dueDate),
          status,
          notes: notes || null,
          lineItems: {
            deleteMany: {}, // Clears old line items
            create: lineItems.map((item: LineItem) => ({
              description: item.description,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
            })),
          },
        },
      });

      return res.status(200).json(updatedInvoice);
    } catch (error) {
      console.error("Error updating invoice:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
