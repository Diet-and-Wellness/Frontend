"use client";

import { useTranslations } from "next-intl";

const AuthFooter = () => {
  const t = useTranslations();

  return (
    <footer className="w-full bg-[var(--color-palette-2d5a3d)] py-8">
      <div className="mx-auto w-[90%]">
        <p className="text-center text-white/80 text-sm md:text-lg font-extralight">
          {t("footer.copyright")}
        </p>
      </div>
    </footer>
  );
};

export default AuthFooter;
