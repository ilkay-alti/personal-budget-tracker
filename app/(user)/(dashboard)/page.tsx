import CreateTransactionDialog from "@/components/Dashboard/CreateTransactionDialog";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const DashboardPage = async () => {
  const user = await currentUser();
  if (!user) {
    console.log("no user");
    redirect("/sing-in");
  }
  console.log(user);
  const userSettings = await prisma.userSettings.findUnique({
    where: {
      userID: user.id,
    },
  });

  if (!userSettings) {
    redirect("/wizard");
  }

  return (
    <div>
      <div className="flex justify-between items-center p-8">
        <h2 className="text-4xl font-bold text-[#09090B]">
          Hello, {user.firstName} 👋
        </h2>
        <div className="flex font-medium text-white text-sm gap-3 ">
          <CreateTransactionDialog type="income" />
          <CreateTransactionDialog type="expense" />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
