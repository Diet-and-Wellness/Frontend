import Image from "next/image";
import Link from "next/link";

const Logo = ({ href }: { href: string }) => {
  return (
    <Link href={href} className="flex flex-row items-center gap-2 lg:gap-5">
      <Image
        src="/icons/logo.svg"
        alt="logo"
        width={45}
        height={10}
        className="w-11 h-11 md:w-14 md:h-14 lg:w-15 lg:h-15"
      />
      <p className="text-[#e99532] text-[22px] lg:text-[28px] font-bold">
        Diet & <span className="text-[#4D8E32]">Wellness</span>
      </p>
    </Link>
  );
};

export default Logo;
