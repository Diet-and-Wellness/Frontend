import { FacebookIcon } from "@/app/[locale]/components/icons/FacebookIcon";
import { InstaIcon } from "@/app/[locale]/components/icons/InstaIcon";
import { LinkedinIcon } from "@/app/[locale]/components/icons/LinkedinIcon";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const socialLinks = [
  {
    href: "https://www.facebook.com/share/1AQvvZeg6o/?mibextid=wwXIfr",
    icon: <FacebookIcon />,
    alt: "Facebook",
  },
  {
    href: "https://www.instagram.com/diet_a_wellness?igsh=M2ZkeHc3OWNranQy",
    icon: <InstaIcon />,
    alt: "Instagram",
  },
  {
    href: "https://www.linkedin.com/company/dietandwellness/",
    icon: <LinkedinIcon />,
    alt: "Linkedin",
  },
];

const Socials = () => {
  const t = useTranslations();

  return (
    <section className="flex flex-col items-start gap-4 sm:gap-5 lg:max-w-[25%] w-full">
      <Link href={"/"} className="flex flex-row items-center gap-2 lg:gap-4">
        <Image
          src="/icons/logo.svg"
          alt="logo"
          width={45}
          height={45}
          className="w-10 h-auto lg:w-15"
        />
        <p className="text-accent text-[22px] lg:text-[24px] font-bold">
          {t("brand.brandName")}
        </p>
      </Link>

      <p
        className="
        text-sm sm:text-base md:text-lg lg:text-xl
        leading-6 sm:leading-7
        font-extralight text-white/90
        max-w-md
      "
      >
        {t("footer.footerMessage")}
      </p>

      <nav
        aria-label="Social media links"
        className="flex items-center gap-4 sm:gap-5"
      >
        {socialLinks.map((social) => (
          <Link
            key={social.alt}
            href={social.href}
            aria-label={social.alt}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform duration-300 hover:scale-110 active:scale-95 bg-accent size-10 flex justify-center items-center rounded-full"
          >
            {social.icon}
          </Link>
        ))}
      </nav>
    </section>
  );
};

export default Socials;
