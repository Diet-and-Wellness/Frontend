"use client";

import Logo from "../../(landingPage)/_components/LandingHeader/Logo";
import ThemeSwitch from "@/app/[locale]/components/Theme/ThemeSwitch";

const AuthHeader = () => {
  return (
    <nav className="fixed top-0 z-50 w-full backdrop-blur-xl">
      <div className="mx-auto flex w-[90%] items-center justify-between py-2">
        <Logo href={"/"} />
        <ThemeSwitch />
      </div>
    </nav>
  );
};

export default AuthHeader;
