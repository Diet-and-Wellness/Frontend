import { useLocale, useTranslations } from "next-intl";
import LanguageIcon from "../../components/icons/LanguageIcon";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const AssessmentHeader = ({
  title,
  onClose,
  closeLabel,
}: {
  title: string;
  onClose: () => void;
  closeLabel?: string;
}) => {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("");

  const pathnameWithLang = usePathname();
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);

  const queryClient = useQueryClient();

  const switchToArabic = () => switchToArabicMutation.mutate();

  const switchToEnglish = () => switchToEnglishMutation.mutate();

  const validateCachedData = () => {
    setShowLanguageOptions(false);

    queryClient.removeQueries({
      queryKey: ["pricingPlans"],
    });

    queryClient.removeQueries({
      queryKey: ["landingBlogs"],
    });

    queryClient.removeQueries({
      queryKey: ["publishedBlogs"],
    });

    queryClient.removeQueries({
      queryKey: ["assessment-result"],
    });
  };

  const switchToEnglishMutation = useMutation({
    mutationFn: async () => {
      const isArabic = locale === "ar";
      if (isArabic) router.replace(pathnameWithLang.replace("/ar", "/en"));
    },
    onSuccess: validateCachedData,
  });

  const switchToArabicMutation = useMutation({
    mutationFn: async () => {
      const isEnglish = locale === "en";
      if (isEnglish) router.replace(pathnameWithLang.replace("/en", "/ar"));
    },
    onSuccess: validateCachedData,
  });

  return (
    <header className="mx-auto flex w-full max-w-260 items-center justify-between gap-4 border-b border-b-line px-4 py-4 sm:px-5 sm:py-5">
      <h2 className="type-card-title font-medium text-content">{title}</h2>
      <div className="flex shrink-0 items-center gap-3">
        <div
          onMouseEnter={() => setShowLanguageOptions(true)}
          onMouseLeave={() => setShowLanguageOptions(false)}
          className="relative"
        >
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={showLanguageOptions}
            onClick={() => setShowLanguageOptions((current) => !current)}
            className="
            shrink-0 cursor-pointer
            items-center
            transition-colors
            rounded-full
            border
            border-line
            bg-surface-muted
            px-3
            py-1.5
            md:px-5
            hover:border-brand
          "
          >
            <LanguageIcon className="size-5.5" />
          </button>

          <AnimatePresence>
            {showLanguageOptions && (
              <div className="absolute right-0 top-full z-50 pt-2">
                <motion.div
                  role="menu"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                  className="flex flex-col gap-2 rounded-2xl border border-line bg-surface-raised p-2 shadow-[0_8px_24px_rgba(0,0,0,0.14)]"
                >
                  <button
                    role="menuitem"
                    onClick={switchToEnglish}
                    className={`w-25 md:min-w-40 cursor-pointer rounded-xl p-2 text-center text-base font-medium transition-colors ${
                      locale === "en"
                        ? "bg-brand-soft text-brand"
                        : "hover:bg-surface-neutral"
                    }`}
                  >
                    English
                  </button>
                  <button
                    role="menuitem"
                    onClick={switchToArabic}
                    className={`w-25 md:min-w-40 cursor-pointer rounded-xl p-2 text-center text-base font-semibold transition-colors ${
                      locale === "ar"
                        ? "bg-brand-soft text-brand"
                        : "hover:bg-surface-neutral"
                    }`}
                  >
                    العربية
                  </button>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={onClose}
          className="
            shrink-0 cursor-pointer
            items-center
            rounded-none
            border border-transparent
            bg-transparent
            p-0
            font-medium
            text-accent
            transition-colors

            md:rounded-full
            md:border-line
            md:bg-surface-muted
            md:px-5
            md:py-1.5
            md:hover:border-brand
          "
        >
          {closeLabel ?? t("dashboard")}
        </button>
      </div>
    </header>
  );
};

export default AssessmentHeader;
