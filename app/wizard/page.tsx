import CardComponent from "@/components/Card";
import LogoComponent from "@/components/Logo";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const WizardPage = async () => {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex flex-col items-center justify-center gap-8">
        <h3 className="text-3xl">
          Welcome, <span className="font-bold">{user.firstName}!</span>
          👋
        </h3>

        <div className="flex flex-col items-center justify-center gap-2 text-[#71717A]">
          <p>Let &apos;s get started by setting up your currency</p>
          <p>You can change these settings at any time</p>
        </div>
        <div className=" w-full h-[1px] bg-[#e4e4e7] rounded-full"></div>
      </div>
      <CardComponent />
      <div className="flex items-center justify-center ">
        <LogoComponent />
      </div>
    </div>
  );
};

export default WizardPage;
