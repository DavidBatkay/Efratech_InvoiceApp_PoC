import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

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
