import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user || !session.user.user_id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "POST") {
    try {
      const { companyName, dueDate, status, notes, lineItems, invoiceNumber } =
        req.body;

      if (!companyName || !dueDate || !invoiceNumber) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Create Invoice in the database
      const newInvoice = await prisma.invoice.create({
        data: {
          companyName,
          totalValue: lineItems.reduce(
            (acc: number, item: any) => acc + item.quantity * item.unitPrice,
            0
          ),
          invoiceNumber,
          dueDate: new Date(dueDate),
          status,
          notes: notes || null,
          user_id: session.user.user_id, // Assign to logged-in user
          lineItems: {
            create: lineItems.map((item: any) => ({
              description: item.description,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
            })),
          },
        },
      });

      return res.status(201).json(newInvoice);
    } catch (error) {
      console.error("Error creating invoice:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  if (req.method === "GET") {
    try {
      const { sortOrder = "desc" } = req.query; // Default to "desc"

      const invoices = await prisma.invoice.findMany({
        where: { user_id: session.user.user_id },
        include: { lineItems: true },
        orderBy: { createdAt: sortOrder === "asc" ? "asc" : "desc" },
      });

      return res.status(200).json(invoices);
    } catch (error) {
      console.error("Error fetching invoices:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
