import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { invoiceId } = req.body;

    if (!invoiceId) {
      return res.status(400).json({ error: "Invoice ID is required" });
    }

    const existingInvoice = await prisma.invoice.findUnique({
      where: { id: Number(invoiceId) },
    });

    if (!existingInvoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    if (
      existingInvoice.status !== "PENDING" &&
      existingInvoice.status !== "OVERDUE"
    ) {
      return res.status(400).json({
        error: "Only pending or overdue invoices can be marked as paid",
      });
    }

    // Update invoice status to PAID
    const updatedInvoice = await prisma.invoice.update({
      where: { id: Number(invoiceId) },
      data: { status: "PAID" },
    });

    // Create Payment record
    await prisma.payment.create({
      data: {
        invoiceId: updatedInvoice.id,
        amount: updatedInvoice.totalValue,
        customerId: updatedInvoice.customerId,
        user_id: updatedInvoice.user_id,
      },
    });

    return res.status(200).json({
      message: "Invoice marked as paid and payment recorded successfully",
    });
  } catch (error) {
    console.error("Error updating invoice status:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
