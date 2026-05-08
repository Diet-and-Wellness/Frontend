import Image from "next/image";
import Link from "next/link";

type LinkItem = {
  href: string;
  title: string;
};

type QuickLinksProps = {
  title: string;
  linksList: LinkItem[];
};

const QuickLinks = ({ title, linksList }: QuickLinksProps) => {
  return (
    <section className="flex flex-col gap-3 sm:gap-4 lg:max-w-[32.5%]">
      {/* Title */}
      <h4 className="text-base sm:text-lg md:text-xl font-medium text-white">
        {title}
      </h4>

      {/* Divider */}
      <Image
        src="/icons/zigzag.svg"
        alt="Decorative divider"
        width={50}
        height={25}
        className="sm:w-15"
      />

      {/* Links */}
      <nav className="flex flex-col items-start gap-3 sm:gap-4 md:gap-5">
        {linksList.map((link) => (
          <LinkComp key={link.title} href={link.href} linkTitle={link.title} />
        ))}
      </nav>
    </section>
  );
};

type LinkCompProps = {
  href: string;
  linkTitle: string;
};

const LinkComp = ({ href, linkTitle }: LinkCompProps) => {
  return (
    <Link
      href={href}
      className="
        group inline-flex items-center gap-2
        transition-all duration-300
        hover:translate-x-1
      "
    >
      {/* Icon */}
      <Image
        src="/icons/arrow-right.svg"
        alt=""
        width={12}
        height={12}
        className="sm:w-3.5 transition-transform duration-300 group-hover:translate-x-1"
      />

      {/* Text */}
      <span
        className="
          text-sm sm:text-base md:text-[18px]
          font-extralight text-white
          transition-colors duration-300
          group-hover:text-white/80
        "
      >
        {linkTitle}
      </span>
    </Link>
  );
};

export default QuickLinks;
