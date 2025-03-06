import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { orderBy, order } = req.query;
    const validOrderBy =
      orderBy === "customerName" || orderBy === "createdAt"
        ? orderBy
        : "createdAt";
    const validOrder = order === "asc" || order === "desc" ? order : "desc";

    const customers = await prisma.customer.findMany({
      where: { user_id: session.user.user_id },
      orderBy: { [validOrderBy]: validOrder },
    });

    return res.status(200).json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
