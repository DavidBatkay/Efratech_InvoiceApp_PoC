import prisma from "@/lib/prisma";
import { InvoiceStatus } from "@prisma/client";

export async function PUT(req: Request) {
  try {
    const { invoiceId } = await req.json();

    if (!invoiceId) {
      return new Response(JSON.stringify({ error: "Invoice ID is required" }), {
        status: 400,
      });
    }

    // Fetch the invoice
    const existingInvoice = await prisma.invoice.findUnique({
      where: { id: Number(invoiceId) },
    });

    if (!existingInvoice) {
      return new Response(JSON.stringify({ error: "Invoice not found" }), {
        status: 404,
      });
    }

    if (
      existingInvoice.status !== InvoiceStatus.PENDING &&
      existingInvoice.status !== InvoiceStatus.OVERDUE
    ) {
      return new Response(
        JSON.stringify({
          error: "Only pending or overdue invoices can be marked as paid",
        }),
        { status: 400 }
      );
    }

    // Update the invoice status to PAID
    const updatedInvoice = await prisma.invoice.update({
      where: { id: Number(invoiceId) },
      data: { status: "PAID" },
    });

    // Create the payment record
    await prisma.payment.create({
      data: {
        invoiceId: updatedInvoice.id,
        amount: updatedInvoice.totalValue,
        customerId: updatedInvoice.customerId,
        user_id: updatedInvoice.user_id,
      },
    });

    return new Response(
      JSON.stringify({
        message: "Invoice marked as paid and payment recorded successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating invoice status:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export const dynamic = "force-static"; // Optional to ensure caching behavior
