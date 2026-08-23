"use client";

import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import NavList from "./NavList";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import ThemeSwitch from "@/app/[locale]/components/Theme/ThemeSwitch";
import { useMe } from "@/app/[locale]/hooks/useMe";
import LogoutIcon from "@/app/[locale]/components/icons/LogoutIcon";
import ProfileAvatar from "@/app/[locale]/components/Public/ProfileAvatar";
import { CloseMenuIcon } from "@/app/[locale]/components/icons/CloseMenuIcon";
import { MobileMenuIcon } from "@/app/[locale]/components/icons/MobileMenuIcon";

const LandingNavBar = ({
  onClickLogout,
  isLoggingout,
}: {
  onClickLogout: () => void;
  isLoggingout: boolean;
}) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const profileMenuRef = useRef<HTMLDivElement>(null);
  const profileButtonRef = useRef<HTMLButtonElement>(null);

  const t = useTranslations();

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

  useEffect(() => {
    if (!showMenu) return;

    const closeMenuOnOutsideInteraction = (event: PointerEvent) => {
      const target = event.target as Node;

      if (
        profileButtonRef.current?.contains(target) ||
        profileMenuRef.current?.contains(target)
      ) {
        return;
      }

      setShowMenu(false);
    };

    const closeMenuOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowMenu(false);
        profileButtonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", closeMenuOnOutsideInteraction);
    document.addEventListener("keydown", closeMenuOnEscape);

    return () => {
      document.removeEventListener(
        "pointerdown",
        closeMenuOnOutsideInteraction,
      );
      document.removeEventListener("keydown", closeMenuOnEscape);
    };
  }, [showMenu]);

  const { data: me } = useMe();

  const menuToggle = () => setIsMenuVisible((value) => !value);

  return (
    <nav className="fixed top-0 z-50 w-full backdrop-blur-xl">
      <div className="mx-auto flex w-[90%] items-center justify-between py-2">
        <Logo href={"/"} />

        <div className="flex items-center gap-5">
          <NavList tabs={tabs} />

          <div className="flex items-center gap-3">
            <div className="hidden xl:block">
              <ThemeSwitch />
            </div>

            {!!me && (
              <button
                ref={profileButtonRef}
                type="button"
                onClick={() => setShowMenu((prev) => !prev)}
                aria-expanded={showMenu}
                aria-haspopup="menu"
                aria-label={`${me.firstName} ${me.lastName}`.trim()}
                className="cursor-pointer rounded-full border-2 border-brand-contrast bg-surface-muted transition-colors"
              >
                <ProfileAvatar
                  avatarUrl={me.avatarUrl}
                  firstName={me.firstName}
                  lastName={me.lastName}
                  statusRingClassName="ring-2 ring-brand-contrast"
                />
              </button>
            )}

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
                    <CloseMenuIcon />
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
                    <MobileMenuIcon />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            <AnimatePresence>
              {showMenu && (
                <motion.div
                  ref={profileMenuRef}
                  role="menu"
                  initial={{ opacity: 0, top: 50 }}
                  animate={{ opacity: 1, top: 65 }}
                  exit={{ opacity: 0, top: 50 }}
                  className="absolute inset-e-4 flex flex-col gap-2 rounded-lg border border-line bg-surface p-2 shadow-[0_0_10px_0px_rgba(0,0,0,0.1)] sm:inset-e-15"
                >
                  <button
                    type="button"
                    role="menuitem"
                    disabled={isLoggingout}
                    onClick={onClickLogout}
                    className={`min-w-40 p-2 text-center flex items-center gap-3 cursor-pointer hover:bg-surface-neutral transition-colors duration-150 rounded-lg`}
                  >
                    <LogoutIcon className="text-danger" />
                    <p className="type-control text-danger">
                      {t("dashboard.logout")}
                    </p>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuVisible && (
          <MobileMenu
            setIsMenuVisible={setIsMenuVisible}
            tabs={tabs}
            onClickLogout={onClickLogout}
            isLoggingout={isLoggingout}
          />
        )}
      </AnimatePresence>
    </nav>
  );
};

export default LandingNavBar;
