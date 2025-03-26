import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    // Parse the query parameters from the request
    const url = new URL(req.url);
    const email = url.searchParams.get("email");
    const sortBy = url.searchParams.get("sortBy") || "email";
    const order = url.searchParams.get("order") || "asc";

    // Validate the sortBy and order parameters
    if (!["email", "createdAt"].includes(sortBy)) {
      return new Response(
        JSON.stringify({ error: "Invalid sortBy parameter" }),
        { status: 400 }
      );
    }

    if (!["asc", "desc"].includes(order)) {
      return new Response(
        JSON.stringify({ error: "Invalid order parameter" }),
        { status: 400 }
      );
    }

    // Fetch users from Prisma
    const users = await prisma.user.findMany({
      where: email ? { email: { contains: email } } : undefined,
      orderBy: {
        [sortBy]: order as "asc" | "desc",
      },
    });

    // Return the users data
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch users" }), {
      status: 500,
    });
  }
}
