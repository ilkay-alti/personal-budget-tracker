import React from "react";

const SkeletonWrapper = ({
  children,
  isLoading,
  fullWidth = true,
}: {
  children: React.ReactNode;
  isLoading: boolean;
  fullWidth?: boolean;
}) => {
  if (!isLoading) return <>{children}</>;
  return (
    <div className="animate-pulse opacity-0">
      <div className={fullWidth ? "w-full" : ""}>{children}</div>
    </div>
  );
};

export default SkeletonWrapper;
