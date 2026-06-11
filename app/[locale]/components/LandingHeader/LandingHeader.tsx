"use client";

import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import NavList from "./NavList";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";

const LandingNavBar = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const t = useTranslations("");

  const tabs = [
    { label: t("navList.links.home"), href: "/" },
    { label: t("navList.links.aboutUs"), href: "/about-us" },
    { label: t("navList.links.blogs"), href: "/blogs" },
    { label: t("navList.links.contactUs"), href: "/contact-us" },
    { label: t("navList.links.pricing"), href: "/pricing" },
  ];

  useEffect(() => {
    document.body.style.overflow = isMenuVisible ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuVisible]);

  const menuToggle = () => setIsMenuVisible((value) => !value);

  return (
    <nav className="fixed top-0 z-50 w-full backdrop-blur-xl">
      <div className="mx-auto flex w-[90%] items-center justify-between py-2">
        <Logo href={"/"} />
        <NavList tabs={tabs} />
        <button
          onClick={menuToggle}
          className="xl:hidden cursor-pointer relative h-10.5 w-10.5"
        >
          <AnimatePresence mode="wait">
            {isMenuVisible ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  width={40}
                  height={40}
                  src="/icons/close-icon.svg"
                  alt="close icon"
                />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -90, scale: 0.7 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  width={40}
                  height={40}
                  src="/icons/menu-icon.svg"
                  alt="menu icon"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
      <AnimatePresence>
        {isMenuVisible && (
          <MobileMenu setIsMenuVisible={setIsMenuVisible} tabs={tabs} />
        )}
      </AnimatePresence>
    </nav>
  );
};

export default LandingNavBar;
