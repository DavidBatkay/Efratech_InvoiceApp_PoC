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

  if (req.method === "GET") {
    try {
      let { sortBy = "createdAt", sortOrder = "desc", userId } = req.query;

      // Ensure sortBy is a valid field
      if (
        typeof sortBy !== "string" ||
        !["createdAt", "amount"].includes(sortBy)
      ) {
        return res.status(400).json({ error: "Invalid sort field" });
      }

      // Ensure sortOrder is valid
      if (
        typeof sortOrder !== "string" ||
        !["asc", "desc"].includes(sortOrder)
      ) {
        return res.status(400).json({ error: "Invalid sort order" });
      }

      // Fetch payments for the current user
      const payments = await prisma.payment.findMany({
        where: {
          user_id: session.user.user_id, // Ensuring the invoice belongs to the user
        },
        orderBy: {
          [sortBy]: sortOrder,
        },
      });

      return res.status(200).json(payments);
    } catch (error) {
      console.error("Error fetching payments:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
