import React from "react";
import AuthHeader from "../components/Auth/AuthHeader";
import AuthFooter from "../components/Auth/AuthFooter";

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
