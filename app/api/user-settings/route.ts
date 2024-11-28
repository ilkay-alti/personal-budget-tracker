import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await currentUser();

  if (!user) {
    return redirect("/sign-in");
  }

  let userSettings = await prisma.userSettings.findUnique({
    where: {
      userID: user.id,
    },
  });

  if (!userSettings) {
    userSettings = await prisma.userSettings.create({
      data: {
        userID: user.id,
        currency: "USD",
      },
    });

    revalidatePath("/");

    return NextResponse.json(userSettings);
  }

  return NextResponse.json(userSettings);
}
