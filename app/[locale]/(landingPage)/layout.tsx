import "./LandingLayout.css";
import React from "react";
import LandingHeader from "./_components/LandingHeader/LandingHeader";
import LandingFooter from "./_components/LandingFooter/LandingFooter";

const landingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="landingContainer">
      <LandingHeader />
      {children}
      <LandingFooter />
    </div>
  );
};

export default landingLayout;
