import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    if (req.method === "GET") {
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
    }

    if (req.method === "POST") {
      const { customerName, email } = req.body;

      if (!customerName) {
        return res.status(400).json({ error: "Customer name is required." });
      }

      const newCustomer = await prisma.customer.create({
        data: {
          customerName,
          email: email || null,
          user_id: session.user.user_id,
        },
      });

      return res.status(201).json(newCustomer);
    }

    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
