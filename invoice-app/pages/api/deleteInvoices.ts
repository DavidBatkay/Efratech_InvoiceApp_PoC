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

    if (!invoiceId) {
      return res.status(400).json({ error: "Invoice ID is required" });
    }

    const existingInvoice = await prisma.invoice.findUnique({
      where: { id: Number(invoiceId) },
      select: { status: true, updatedAt: true }, // Select updatedAt for preserving payment date
    });

    if (!existingInvoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    if (existingInvoice.status === "PAID") {
      // Archive instead of deleting
      await prisma.invoice.update({
        where: { id: Number(invoiceId) },
        data: { status: "ARCHIVED", updatedAt: existingInvoice.updatedAt },
      });
      return res.status(200).json({ message: "Invoice archived successfully" });
    }

    if (existingInvoice.status === "ARCHIVED") {
      // Unarchive (back to PAID), keeping the same updatedAt
      await prisma.invoice.update({
        where: { id: Number(invoiceId) },
        data: { status: "PAID", updatedAt: existingInvoice.updatedAt },
      });
      return res
        .status(200)
        .json({ message: "Invoice unarchived successfully" });
    }

    // If not PAID or ARCHIVED, delete normally
    await prisma.invoice.delete({
      where: { id: Number(invoiceId) },
    });

    return res.status(200).json({ message: "Invoice deleted successfully" });
  } catch (error) {
    console.error("Error deleting invoice:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
