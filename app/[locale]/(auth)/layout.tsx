import React from "react";
import AuthHeader from "./_components/AuthHeader";
import AuthFooter from "./_components/AuthFooter";

const authLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <AuthHeader />
      {children}
      <AuthFooter />
    </div>
  );
};

export default authLayout;
