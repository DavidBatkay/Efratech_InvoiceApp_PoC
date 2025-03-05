import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method Not Allowed" });

  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: "Unauthorized" });

  const { id } = req.query;
  if (!id || isNaN(Number(id)))
    return res.status(400).json({ error: "Invalid customer ID" });

  try {
    const customer = await prisma.customer.findFirst({
      where: { id: Number(id), user_id: session.user.user_id },
    });

    if (!customer) return res.status(404).json({ error: "Customer not found" });

    return res.status(200).json(customer);
  } catch (error) {
    console.error("Error fetching customer:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
