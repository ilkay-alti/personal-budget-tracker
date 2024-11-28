import NavbarComponent from "@/components/Navbar";
import React from "react";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <NavbarComponent />
      {children}
    </div>
  );
};

export default UserLayout;
