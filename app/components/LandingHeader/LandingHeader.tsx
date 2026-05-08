"use client";

import { usePathname } from "next/navigation";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import NavList from "./NavList";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const tabs = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Pricing", href: "/pricing" },
];

const LandingNavBar = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuVisible ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuVisible]);

  const pathname = usePathname();

  useEffect(() => {
    setIsMenuVisible(false);
  }, [pathname]);

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
        {isMenuVisible && <MobileMenu tabs={tabs} />}
      </AnimatePresence>
    </nav>
  );
};

export default LandingNavBar;
