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

  return <div>DashboardPage {user.firstName} </div>;
};

export default DashboardPage;
