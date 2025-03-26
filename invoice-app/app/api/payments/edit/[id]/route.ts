import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { notes } = await req.json(); // Parse the JSON body

  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "Invalid payment ID" }, { status: 400 });
  }

  try {
    // Update payment record with the provided notes
    const updatedPayment = await prisma.payment.update({
      where: { id: Number(id) },
      data: { notes },
    });

    // Return the updated payment
    return NextResponse.json(updatedPayment, { status: 200 });
  } catch (error) {
    console.error("Error updating payment:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
