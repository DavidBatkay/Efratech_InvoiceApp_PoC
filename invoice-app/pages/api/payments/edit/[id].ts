import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;
  const { notes } = req.body;
  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Invalid payment ID" });
  }
  try {
    const updatedPayment = await prisma.payment.update({
      where: { id: Number(id) },
      data: { notes },
    });

    return res.status(200).json(updatedPayment);
  } catch (error) {
    console.error("Error updating payment:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
