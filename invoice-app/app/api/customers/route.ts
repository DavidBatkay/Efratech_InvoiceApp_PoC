import { auth } from "@/lib/auth"; // Use `auth()` instead of `getServerSession`
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const orderBy = searchParams.get("orderBy");
    const order = searchParams.get("order");

    const validOrderBy =
      orderBy === "customerName" || orderBy === "createdAt"
        ? orderBy
        : "createdAt";
    const validOrder = order === "asc" || order === "desc" ? order : "desc";

    const customers = await prisma.customer.findMany({
      where: { user_id: session.user.user_id },
      orderBy: { [validOrderBy]: validOrder },
    });

    return NextResponse.json(customers, { status: 200 });
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { customerName, email } = await req.json();

    if (!customerName) {
      return NextResponse.json(
        { error: "Customer name is required." },
        { status: 400 }
      );
    }

    const newCustomer = await prisma.customer.create({
      data: {
        customerName,
        email: email || null,
        user_id: session.user.user_id,
      },
    });

    return NextResponse.json(newCustomer, { status: 201 });
  } catch (error) {
    console.error("Error creating customer:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
