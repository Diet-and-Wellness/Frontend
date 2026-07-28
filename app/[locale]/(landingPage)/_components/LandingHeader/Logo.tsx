import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const Logo = ({ href }: { href: string }) => {
  const t = useTranslations();

  return (
    <Link href={href} className="flex flex-row items-center gap-1 lg:gap-2">
      <Image
        src="/icons/logo.svg"
        alt="logo"
        width={45}
        height={45}
        className="w-11 h-auto md:w-13 lg:w-14"
      />
      <p className="text-[#e99532] text-[20px] lg:text-[24px] font-bold">
        {t("brand.diet")}{" "}
        <span className="text-[#4D8E32]">{t("brand.wellness")}</span>
      </p>
    </Link>
  );
};

export default Logo;
