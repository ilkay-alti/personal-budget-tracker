import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full items-center justify-center bg-red-300">
      {children}
    </div>
  );
};

export default AuthLayout;
