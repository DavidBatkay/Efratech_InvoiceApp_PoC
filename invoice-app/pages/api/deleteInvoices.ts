import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { invoiceId } = req.body;

    const existingInvoice = await prisma.invoice.findUnique({
      where: { id: Number(invoiceId) },
    });

    if (!existingInvoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    if (existingInvoice.status === "PAID") {
      return res.status(403).json({ error: "Paid invoices cannot be deleted" });
    }

    if (!invoiceId) {
      return res.status(400).json({ error: "Invoice ID is required" });
    }

    await prisma.invoice.delete({
      where: { id: invoiceId },
    });

    return res.status(200).json({ message: "Invoice deleted successfully" });
  } catch (error) {
    console.error("Error deleting invoice:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
