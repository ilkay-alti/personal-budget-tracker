import CreateTransactionDialog from "@/components/Dashboard/CreateTransactionDialog";
import Overview from "@/components/Dashboard/Overview";
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

  const userSettings = await prisma.userSettings.findUnique({
    where: {
      userID: user.id,
    },
  });

  if (!userSettings) {
    redirect("/wizard");
  }

  return (
    <div className="flex flex-col ">
      <div className="flex justify-between items-center p-8 outline outline-1 outline-gray-300">
        <h2 className="text-4xl font-bold text-[#09090B]">
          Hello, {user.firstName} 👋
        </h2>
        <div className="flex font-medium text-white text-sm gap-3 ">
          <CreateTransactionDialog type="income" />
          <CreateTransactionDialog type="expense" />
        </div>
      </div>
      <Overview />
    </div>
  );
};

export default DashboardPage;
