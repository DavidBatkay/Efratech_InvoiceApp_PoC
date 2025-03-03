import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.user_id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (req.method === "GET") {
      // Fetch user data
      const user = await prisma.user.findUnique({
        where: { user_id: session.user.user_id },
        select: {
          user_id: true,
          email: true,
          name: true,
          createdAt: true,
        },
      });

      if (!user) return res.status(404).json({ error: "User not found" });

      return res.status(200).json(user);
    }

    if (req.method === "PATCH") {
      // Update user name
      const { name } = req.body;
      if (!name || name.trim().length === 0) {
        return res.status(400).json({ error: "Name cannot be empty" });
      }

      const updatedUser = await prisma.user.update({
        where: { user_id: session.user.user_id },
        data: { name },
        select: { user_id: true, name: true },
      });

      return res.status(200).json(updatedUser);
    }

    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
