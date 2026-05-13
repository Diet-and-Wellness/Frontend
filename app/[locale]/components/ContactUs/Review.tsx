import { useTranslations } from "next-intl";
import Image from "next/image";

const Review = () => {
  const t = useTranslations();

  return (
    <div className="max-w-130 rounded-3xl shadow-xl p-5 bg-white/20 backdrop-blur-xl border border-white/40 flex flex-col gap-5">
      <Image
        src="/icons/quote.svg"
        alt="Decorative divider"
        width={45}
        height={35}
      />
      <p className="text-base leading-relaxed text-black/90 font-medium">
        {t("contactUs.reviewText")}
      </p>
      <div className="flex flex-row gap-4 items-center">
        <Image
          src="/images/profileImg.webp"
          alt="profile img"
          width={60}
          height={60}
          className="rounded-full"
        />
        <div>
          <p className="font-bold text">{t("contactUs.reviewerName")}</p>
          <p className="text-[#6B6B6B]">{t("contactUs.reviewerAge")}</p>
        </div>
      </div>
    </div>
  );
};

export default Review;
