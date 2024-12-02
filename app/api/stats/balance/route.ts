import prisma from "@/lib/prisma";
import { OverviewQuerySchema } from "@/schema/overview";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const { searchParams } = new URL(request.url);

  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const queryParams = OverviewQuerySchema.safeParse({
    from: new Date(from || ""),
    to: new Date(to || ""),
  });

  if (!queryParams.success) {
    return new Response(JSON.stringify({ error: "Invalid query parameters" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const stats = await getBlanceStats(
      user.id,
      queryParams.data.from,
      queryParams.data.to,
    );
    console.log(stats);
    return new Response(JSON.stringify(stats), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch balance stats" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}

async function getBlanceStats(userId: string, from: Date, to: Date) {
  try {
    const totals = await prisma.transaction.groupBy({
      by: ["type"],
      where: {
        userId,
        createdAt: {
          gte: from,
          lte: to,
        },
      },
      _sum: {
        amount: true,
      },
    });

    console.log("totall", totals);

    return {
      expense: totals.find((t) => t.type === "expense")?._sum.amount,
      income: totals.find((t) => t.type === "income")?._sum.amount,
    };
  } catch (error) {
    console.error("Error fetching balance stats:", error);
    throw new Error("Failed to fetch balance stats");
  }
}
