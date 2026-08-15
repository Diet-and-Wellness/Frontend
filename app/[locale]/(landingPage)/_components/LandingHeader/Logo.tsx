import Image from "next/image";
import Link from "next/link";

const Logo = ({ href }: { href: string }) => {
  return (
    <Link href={href}>
      <Image
        src="/icons/logo.svg"
        alt="logo"
        width={45}
        height={45}
        className="w-12.5 h-auto md:w-14 lg:w-15"
      />
    </Link>
  );
};

export default Logo;
