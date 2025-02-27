import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method Not Allowed" });

  try {
    const { email, sortBy = "email", order = "asc" } = req.query;
    if (!["email", "createdAt"].includes(sortBy as string))
      return res.status(400).json({ error: "Invalid sortBy parameter" });

    if (!["asc", "desc"].includes(order as string))
      return res.status(400).json({ error: "Invalid order parameter" });

    const users = await prisma.user.findMany({
      where: email ? { email: { contains: email.toString() } } : undefined,
      orderBy: {
        [sortBy as "email" | "createdAt"]: order as "asc" | "desc",
      },
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
}
