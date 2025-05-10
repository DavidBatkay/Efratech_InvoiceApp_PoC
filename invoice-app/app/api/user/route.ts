import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();

  if (!session?.user?.user_id) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { user_id: session.user.user_id },
      select: {
        user_id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, password, name } = body;

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email and password are required" }),
        {
          status: 400,
        }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), {
        status: 409,
      });
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        password, // Make sure this is hashed if you're not using NextAuth!
        name,
      },
    });

    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function PATCH(req: Request) {
  const session = await auth();

  if (!session?.user?.user_id) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    const { name } = await req.json(); // Parse the request body for PATCH

    if (!name || name.trim().length === 0) {
      return new Response(JSON.stringify({ error: "Name cannot be empty" }), {
        status: 400,
      });
    }

    const updatedUser = await prisma.user.update({
      where: { user_id: session.user.user_id },
      data: { name },
      select: { user_id: true, name: true },
    });

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
