import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
export async function GET() {
  const session = await auth(); // Adjust this if needed.

  if (!session || !session.user?.user_id) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const userId = session.user.user_id;

  try {
    const totalInvoices = await prisma.invoice.count({
      where: { user_id: userId },
    });
    const pendingInvoices = await prisma.invoice.count({
      where: { user_id: userId, status: "PENDING" },
    });
    const paidInvoices = await prisma.invoice.count({
      where: { user_id: userId, status: "PAID" },
    });
    const overdueInvoices = await prisma.invoice.count({
      where: { user_id: userId, status: "OVERDUE" },
    });
    const archivedInvoices = await prisma.invoice.count({
      where: { user_id: userId, status: "ARCHIVED" },
    });

    const totalCustomers = await prisma.customer.count({
      where: { user_id: userId },
    });

    const totalRevenue = await prisma.invoice.aggregate({
      where: { user_id: userId, status: { in: ["PAID", "ARCHIVED"] } },
      _sum: { totalValue: true },
    });

    const totalOutstanding = await prisma.invoice.aggregate({
      where: { user_id: userId, status: { in: ["PENDING", "OVERDUE"] } },
      _sum: { totalValue: true },
    });

    const favoriteCustomer = await prisma.invoice.groupBy({
      by: ["customerId"],
      where: { user_id: userId, customerId: { not: null } },
      _count: { customerId: true },
      orderBy: { _count: { customerId: "desc" } },
      take: 1,
    });

    let favoriteCustomerName = "No data";
    if (favoriteCustomer.length > 0) {
      const customer = await prisma.customer.findUnique({
        where: { id: favoriteCustomer[0].customerId! },
        select: { customerName: true },
      });
      favoriteCustomerName = customer?.customerName ?? "No data";
    }

    return new Response(
      JSON.stringify({
        totalInvoices: totalInvoices || "No data",
        pendingInvoices: pendingInvoices || "No data",
        paidInvoices: paidInvoices || "No data",
        overdueInvoices: overdueInvoices || "No data",
        archivedInvoices: archivedInvoices || "No data",
        totalCustomers: totalCustomers || "No data",
        totalRevenue: totalRevenue._sum.totalValue || "No data",
        totalOutstanding: totalOutstanding._sum.totalValue || "No data",
        favoriteCustomer: favoriteCustomerName,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
