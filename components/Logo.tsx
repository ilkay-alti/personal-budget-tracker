import { Landmark } from "lucide-react";
import React from "react";

const LogoComponent = () => {
  return (
    <div className="flex items-center gap-2 p-2 text-black dark:text-white">
      <Landmark size={32} />
      <span className="text-2xl font-bold">BudgetTracker</span>
    </div>
  );
};

export default LogoComponent;
