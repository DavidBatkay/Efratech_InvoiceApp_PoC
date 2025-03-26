import prisma from "@/lib/prisma";
import { LineItem } from "@prisma/client";
import { auth } from "@/lib/auth";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params; // Access the invoice ID from params
  const session = await auth();

  if (!id) {
    return new Response(JSON.stringify({ error: "Invalid invoice ID" }), {
      status: 400,
    });
  }

  try {
    // Check for the existing invoice
    const existingInvoice = await prisma.invoice.findUnique({
      where: { id: Number(id) },
    });

    if (!existingInvoice) {
      return new Response(JSON.stringify({ error: "Invoice not found" }), {
        status: 404,
      });
    }

    if (
      existingInvoice.status === "PAID" ||
      existingInvoice.status === "ARCHIVED"
    ) {
      return new Response(
        JSON.stringify({ error: "Paid or Archived invoices cannot be edited" }),
        { status: 403 }
      );
    }

    const { customerId, dueDate, status, notes, lineItems, invoiceNumber } =
      await req.json();

    const customer = await prisma.customer.findFirst({
      where: {
        id: Number(customerId),
        user_id: session?.user.user_id,
      },
    });

    if (!customer) {
      return new Response(JSON.stringify({ error: "Invalid customer" }), {
        status: 402,
      });
    }

    // Update the invoice
    const updatedInvoice = await prisma.invoice.update({
      where: { id: Number(id) },
      data: {
        customerEmail: customer.email,
        customerId: customer.id,
        totalValue: lineItems.reduce(
          (acc: number, item: LineItem) => acc + item.quantity * item.unitPrice,
          0
        ),
        invoiceNumber,
        dueDate: new Date(dueDate),
        status,
        notes: notes || null,
        lineItems: {
          deleteMany: {}, // Clears old line items
          create: lineItems.map((item: LineItem) => ({
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
          })),
        },
      },
    });

    return new Response(JSON.stringify(updatedInvoice), { status: 200 });
  } catch (error) {
    console.error("Error updating invoice:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export const dynamic = "force-static"; // Optional to ensure caching behavior
