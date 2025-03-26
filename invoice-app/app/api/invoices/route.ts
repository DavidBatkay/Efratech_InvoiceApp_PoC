import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { LineItem } from "@prisma/client";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.user_id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { customerId, dueDate, status, notes, lineItems, invoiceNumber } =
      await req.json();

    if (!customerId || !dueDate || !invoiceNumber) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const customer = await prisma.customer.findFirst({
      where: { id: customerId, user_id: session.user.user_id },
    });

    if (!customer) {
      return NextResponse.json(
        { error: "Customer not found or unauthorized" },
        { status: 403 }
      );
    }

    const totalValue = lineItems.reduce(
      (acc: number, item: LineItem) => acc + item.quantity * item.unitPrice,
      0
    );

    const newInvoice = await prisma.invoice.create({
      data: {
        customerId,
        totalValue,
        invoiceNumber,
        dueDate: new Date(dueDate),
        status,
        notes: notes || null,
        user_id: session.user.user_id,
        lineItems: {
          create: lineItems.map((item: LineItem) => ({
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
          })),
        },
        customerName: customer.customerName,
        customerEmail: customer.email,
      },
    });

    return NextResponse.json(newInvoice, { status: 201 });
  } catch (error) {
    console.error("Error creating invoice:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.user_id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const sortOrder = searchParams.get("sortOrder") || "desc";
    const filter = searchParams.get("filter") || "all";

    const whereCondition: {
      user_id: number;
      status?: string | { not: string };
    } = {
      user_id: session.user.user_id,
    };

    if (filter === "all") {
      whereCondition.status = { not: "ARCHIVED" };
    } else if (filter === "archived") {
      whereCondition.status = "ARCHIVED";
    } else {
      whereCondition.status = filter.toUpperCase();
    }

    const invoices = await prisma.invoice.findMany({
      where: whereCondition,
      include: {
        lineItems: true,
        customer: true,
      },
      orderBy: { createdAt: sortOrder === "asc" ? "asc" : "desc" },
    });

    return NextResponse.json(invoices, { status: 200 });
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
