import Spinner from "@/app/[locale]/components/Public/LoadingSpinner";
import { useRouter } from "@/i18n/navigation";
import Image from "next/image";

type LinkItem = {
  href?: string;
  onTry?: () => void;
  loading?: boolean;
  title: string;
};

type QuickLinksProps = {
  title: string;
  linksList: LinkItem[];
};

const QuickLinks = ({ title, linksList }: QuickLinksProps) => {
  return (
    <section className="flex flex-col gap-3 sm:gap-4 lg:max-w-[32.5%]">
      <h4 className="text-base sm:text-lg md:text-xl font-medium text-white">
        {title}
      </h4>

      <nav className="flex flex-col items-start gap-3 sm:gap-4 md:gap-5">
        {linksList.map((link) => (
          <LinkComp
            key={link.title}
            linkTitle={link.title}
            href={link.href}
            onTry={link.onTry}
            loading={link.loading ?? false}
          />
        ))}
      </nav>
    </section>
  );
};

type LinkCompProps = {
  href?: string;
  onTry?: () => void;
  linkTitle: string;
  loading?: boolean;
};

const LinkComp = ({ onTry, loading, href, linkTitle }: LinkCompProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (!!href) {
      router.replace(href);
    } else if (!!onTry) {
      onTry();
    } else return;
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`
        group inline-flex items-center gap-2
        transition-all duration-300
        cursor-pointer
        ${loading ? "" : "cursor-pointer hover:translate-x-1"}
      `}
    >
      <Image
        src="/icons/arrow-right.svg"
        alt=""
        width={12}
        height={12}
        className="sm:w-3.5 transition-transform duration-300 group-hover:translate-x-1"
      />

      <span
        className="
          text-sm sm:text-base md:text-[18px]
          font-extralight text-white
          transition-colors duration-300
          group-hover:text-white/80
          flex items-center gap-1.5
        "
      >
        {linkTitle} {loading && <Spinner spinnerSize={18} />}
      </span>
    </button>
  );
};

export default QuickLinks;
