import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const Logo = ({ href }: { href: string }) => {
  const t = useTranslations();

  return (
    <Link href={href} className="flex flex-row items-center gap-2 lg:gap-3">
      <Image
        src="/icons/logo.svg"
        alt="logo"
        width={45}
        height={45}
        className="w-11 h-auto md:w-14 lg:w-16"
      />
      <p className="text-[#e99532] text-[22px] lg:text-[28px] font-bold">
        {t("brand.diet")}{" "}
        <span className="text-[#4D8E32]">{t("brand.wellness")}</span>
      </p>
    </Link>
  );
};

export default Logo;
