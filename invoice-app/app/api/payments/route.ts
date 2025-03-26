import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await auth();

  if (!session || !session.user || !session.user.user_id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = req.nextUrl;
  const sortBy = searchParams.get("sortBy") || "createdAt";
  const sortOrder = searchParams.get("sortOrder") || "desc";

  // Ensure sortBy is a valid field
  if (typeof sortBy !== "string" || !["createdAt", "amount"].includes(sortBy)) {
    return NextResponse.json({ error: "Invalid sort field" }, { status: 400 });
  }

  // Ensure sortOrder is valid
  if (typeof sortOrder !== "string" || !["asc", "desc"].includes(sortOrder)) {
    return NextResponse.json({ error: "Invalid sort order" }, { status: 400 });
  }

  try {
    // Fetch payments for the current user
    const payments = await prisma.payment.findMany({
      where: {
        user_id: session.user.user_id, // Ensuring the invoice belongs to the user
      },
      include: {
        customer: true,
      },
      orderBy: {
        [sortBy]: sortOrder,
      },
    });

    return NextResponse.json(payments);
  } catch (error) {
    console.error("Error fetching payments:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
