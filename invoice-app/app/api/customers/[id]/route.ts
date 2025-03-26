import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid customer ID" }, { status: 400 });
  }

  try {
    const customer = await prisma.customer.findFirst({
      where: { id, user_id: session.user.user_id },
    });
    if (!customer) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(customer);
  } catch (error) {
    console.error("Error fetching customer:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid customer ID" }, { status: 400 });
  }

  try {
    const { customerName, email } = await req.json();
    if (!customerName?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: "Customer name and email are required." },
        { status: 400 }
      );
    }

    const updatedCustomer = await prisma.customer.update({
      where: { id, user_id: session.user.user_id },
      data: { customerName, email },
    });
    return NextResponse.json(updatedCustomer);
  } catch (error) {
    console.error("Error updating customer:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid customer ID" }, { status: 400 });
  }

  try {
    const customer = await prisma.customer.findUnique({
      where: { id, user_id: session.user.user_id },
      select: { customerName: true, email: true },
    });
    if (!customer) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }

    await prisma.invoice.updateMany({
      where: { customerId: id },
      data: {
        customerId: null,
        customerName: customer.customerName,
        customerEmail: customer.email,
      },
    });

    await prisma.customer.delete({
      where: { id, user_id: session.user.user_id },
    });
    return NextResponse.json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error("Error deleting customer:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
