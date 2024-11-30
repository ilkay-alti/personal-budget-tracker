"use server";

import prisma from "@/lib/prisma";
import {
  CreateTransactionSchema,
  CreateTransactionSchemaType,
} from "@/schema/transaction";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function CreateTransaction(data: CreateTransactionSchemaType) {
  const parseBody = CreateTransactionSchema.safeParse(data);
  console.log(parseBody);
  console.log(data);
  if (!parseBody.success) {
    throw new Error("Bad Request - Invalid Body");
  }

  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const currency = await prisma.userSettings.findUnique({
    where: {
      userID: user.id,
    },
    select: {
      currency: true,
    },
  });

  const { amount, category, date, type, description } = parseBody.data;

  // Convert date string to Date object if necessary
  const transactionDate = new Date(date);

  const categoryRow = await prisma.category.findFirst({
    where: {
      userId: user.id,
      name: category,
    },
  });

  if (!categoryRow) {
    throw new Error("Category not found");
  }

  await prisma.$transaction([
    prisma.transaction.create({
      data: {
        amount,
        category: categoryRow.name,
        categoryIcon: categoryRow.icon,
        date: transactionDate,
        description,
        type,
        userId: user.id,
        currency: currency?.currency || "USD",
      },
    }),

    prisma.monthHistory.upsert({
      where: {
        userId_day_month_year: {
          userId: user.id,
          day: transactionDate.getUTCDate(),
          month: transactionDate.getUTCMonth() + 1,
          year: transactionDate.getUTCFullYear(),
        },
      },
      create: {
        userId: user.id,
        day: transactionDate.getUTCDate(),
        month: transactionDate.getUTCMonth() + 1,
        year: transactionDate.getUTCFullYear(),
        expense: type === "expense" ? amount : 0,
        income: type === "income" ? amount : 0,
      },
      update: {
        expense: {
          increment: type === "expense" ? amount : 0,
        },
        income: {
          increment: type === "income" ? amount : 0,
        },
      },
    }),

    // Update yearly aggregate table
    prisma.yearHistory.upsert({
      where: {
        userId_mouth_year: {
          userId: user.id,
          mouth: transactionDate.getUTCMonth() + 1,
          year: transactionDate.getUTCFullYear(),
        },
      },
      create: {
        userId: user.id,
        mouth: transactionDate.getUTCMonth() + 1,
        year: transactionDate.getUTCFullYear(),
        expense: type === "expense" ? amount : 0,
        income: type === "income" ? amount : 0,
      },
      update: {
        expense: {
          increment: type === "expense" ? amount : 0,
        },
        income: {
          increment: type === "income" ? amount : 0,
        },
      },
    }),
  ]);
}
