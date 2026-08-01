"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { ComponentType, SVGProps } from "react";
import { Leaf } from "@/app/[locale]/components/icons/LeafIcon";
import { Diamond } from "@/app/[locale]/components/icons/DiamondIcon";

type toolPropsType = {
  isFree: boolean;
  ToolIcon: ComponentType<SVGProps<SVGSVGElement>>;
  toolName: string;
  toolDesc: string;
  onTry: () => void;
};

const Tool = ({
  isFree,
  ToolIcon,
  toolName,
  toolDesc,
  onTry,
}: toolPropsType) => {
  const t = useTranslations();

  return (
    <motion.li
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      className={`
      group
      w-full h-full
      flex flex-col justify-between
      gap-6
      p-4 sm:p-5
      border-2
      ${isFree ? "bg-brand-soft" : "bg-accent-soft"}
      ${isFree ? "border-(--color-palette-c8dcbf)" : "border-(--color-palette-f8debf)"}
      rounded-4xl
      ${isFree ? "hover:bg-(--color-tool-free-hover)" : "hover:bg-(--color-tool-premium-hover)"}
      hover:scale-103
      transition-all duration-300
      `}
    >
      {/* Top */}
      <div className="flex justify-between items-start">
        <div
          className={`p-2.5 sm:p-3 rounded-2xl ${isFree ? "bg-(--color-palette-c8dcbf) group-hover:bg-brand-soft" : "bg-(--color-palette-f8debf) group-hover:bg-accent-soft"} flex items-center justify-center transition-colors duration-300`}
        >
          <ToolIcon className="size-9 text-content sm:size-10 group-hover:rotate-15 transition-transform duration-300" />
        </div>

        <div
          className={`
          flex flex-row justify-center items-center gap-1 px-4 py-1 rounded-full text-xs sm:text-sm font-bold
          ${isFree ? "bg-brand" : "bg-accent"}
          group-hover:border group-hover:border-surface
        `}
        >
          {isFree ? (
            <Leaf className="text-brand-contrast" />
          ) : (
            <Diamond className="text-accent-contrast" />
          )}
          <p
            className={`type-meta font-bold leading-4 ${isFree ? "text-brand-contrast" : "text-accent-contrast"}`}
          >
            {isFree ? t("tools.free") : t("tools.premium")}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 flex-1">
        <h4 className="type-card-title line-clamp-2 font-bold text-content group-hover:text-white transition-colors duration-300">
          {toolName}
        </h4>

        <p className="type-body line-clamp-3 font-medium text-content-muted group-hover:text-white transition-colors duration-300">
          {toolDesc}
        </p>
      </div>

      {/* Button */}
      <button
        onClick={onTry}
        className={`
            py-2.5
            md:py-3
            border-2 ${isFree ? "border-brand" : "border-accent"}
            rounded-full
            ${isFree ? "text-brand" : "text-accent"}
            font-bold
            type-control
            transition-all duration-300
            group-hover:bg-surface-raised
            active:scale-98
            cursor-pointer
        `}
      >
        {t("tools.tryNow")}
      </button>
    </motion.li>
  );
};

export default Tool;
