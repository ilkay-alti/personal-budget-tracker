import React from "react";

const WizardLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex w-full h-screen">{children}</div>;
};

export default WizardLayout;
