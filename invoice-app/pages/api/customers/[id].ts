import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: "Unauthorized" });

  const { id } = req.query;
  if (!id || isNaN(Number(id)))
    return res.status(400).json({ error: "Invalid customer ID" });

  if (req.method === "GET") {
    try {
      const customer = await prisma.customer.findFirst({
        where: { id: Number(id), user_id: session.user.user_id },
      });

      if (!customer)
        return res.status(404).json({ error: "Customer not found" });

      return res.status(200).json(customer);
    } catch (error) {
      console.error("Error fetching customer:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  if (req.method === "PUT") {
    try {
      const { customerName, email } = req.body;

      if (!customerName?.trim() || !email?.trim()) {
        return res
          .status(400)
          .json({ error: "Customer name and email are required." });
      }

      const updatedCustomer = await prisma.customer.update({
        where: { id: Number(id), user_id: session.user.user_id },
        data: { customerName, email },
      });

      return res.status(200).json(updatedCustomer);
    } catch (error) {
      console.error("Error updating customer:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  if (req.method === "DELETE") {
    try {
      const customer = await prisma.customer.findUnique({
        where: { id: Number(id), user_id: session.user.user_id },
        select: { customerName: true, email: true },
      });

      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }

      // Update related invoices before deleting the customer
      await prisma.invoice.updateMany({
        where: { customerId: Number(id) },
        data: {
          customerId: null, // Detach from deleted customer
          customerName: customer.customerName, // Preserve name
          customerEmail: customer.email, // Preserve email
        },
      });

      // Now, delete the customer
      await prisma.customer.delete({
        where: { id: Number(id), user_id: session.user.user_id },
      });

      return res.status(200).json({ message: "Customer deleted successfully" });
    } catch (error) {
      console.error("Error deleting customer:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
