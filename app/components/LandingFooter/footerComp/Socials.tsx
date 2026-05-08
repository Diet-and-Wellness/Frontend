import Image from "next/image";
import Link from "next/link";

const socialLinks = [
  { href: "/", icon: "/icons/facebook.svg", alt: "Facebook" },
  { href: "/", icon: "/icons/twitter.svg", alt: "Twitter" },
  { href: "/", icon: "/icons/insta.svg", alt: "Instagram" },
  { href: "/", icon: "/icons/youtube.svg", alt: "YouTube" },
];

const Socials = () => {
  return (
    <section className="flex flex-col items-start gap-4 sm:gap-5 lg:max-w-[25%] w-full">
      <Link href={"/"} className="flex flex-row items-center gap-2 lg:gap-4">
        <Image
          src="/icons/logo.svg"
          alt="logo"
          width={45}
          height={10}
          className="max-w-10 max-h-14 lg:max-w-15 lg:max-h-15"
        />
        <p className="text-[#e99532] text-[22px] lg:text-[24px] font-bold">
          Diet & Wellness
        </p>
      </Link>

      {/* Text */}
      <p
        className="
        text-sm sm:text-base md:text-lg lg:text-xl
        leading-6 sm:leading-7
        font-extralight text-white/90
        max-w-md
      "
      >
        The proper footer at the proper time can help protect you. We assist you
        in moving everybody forward.
      </p>

      {/* Social Icons */}
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
            className="transition-transform duration-300 hover:scale-110 active:scale-95"
          >
            <Image
              src={social.icon}
              alt={social.alt}
              width={36}
              height={36}
              className="sm:w-10 md:w-11.25"
            />
          </Link>
        ))}
      </nav>
    </section>
  );
};

export default Socials;
