import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { InvoiceStatus, LineItem } from "@prisma/client";

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

export async function DELETE(req: Request) {
  try {
    const { invoiceId } = await req.json();

    if (!invoiceId) {
      return NextResponse.json(
        { error: "Invoice ID is required" },
        { status: 400 }
      );
    }

    const existingInvoice = await prisma.invoice.findUnique({
      where: { id: Number(invoiceId) },
      select: { status: true, updatedAt: true }, // Select updatedAt for preserving payment date
    });

    if (!existingInvoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    if (existingInvoice.status === "PAID") {
      // Archive instead of deleting
      await prisma.invoice.update({
        where: { id: Number(invoiceId) },
        data: { status: "ARCHIVED", updatedAt: existingInvoice.updatedAt },
      });
      return NextResponse.json({ message: "Invoice archived successfully" });
    }

    if (existingInvoice.status === "ARCHIVED") {
      // Unarchive (back to PAID), keeping the same updatedAt
      await prisma.invoice.update({
        where: { id: Number(invoiceId) },
        data: { status: "PAID", updatedAt: existingInvoice.updatedAt },
      });
      return NextResponse.json({ message: "Invoice unarchived successfully" });
    }

    // If not PAID or ARCHIVED, delete normally
    await prisma.invoice.delete({
      where: { id: Number(invoiceId) },
    });

    return NextResponse.json({ message: "Invoice deleted successfully" });
  } catch (error) {
    console.error("Error deleting invoice:", error);
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
      status?: InvoiceStatus | { not: InvoiceStatus };
    } = {
      user_id: session.user.user_id,
    };

    if (filter === "all") {
      whereCondition.status = { not: InvoiceStatus.ARCHIVED };
    } else if (filter === "archived") {
      whereCondition.status = InvoiceStatus.ARCHIVED;
    } else {
      whereCondition.status = filter.toUpperCase() as InvoiceStatus;
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
