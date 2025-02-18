import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method not allowed" });
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session || !session.user || !session.user.user_id) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const { sortOrder = "desc" } = req.query;
    const order = sortOrder === "asc" ? "asc" : "desc";

    const pendingInvoices = await prisma.invoice.findMany({
      where: {
        user_id: session.user.user_id,
        status: "PENDING",
      },
      include: {
        lineItems: true,
      },
      orderBy: {
        createdAt: order,
      },
    });

    return res.status(200).json(pendingInvoices);
  } catch (error) {
    console.error("Error fetching pending invoices:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
