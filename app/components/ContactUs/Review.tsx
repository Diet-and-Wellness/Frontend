import Image from "next/image";

const Review = () => {
  return (
    <div className="max-w-130 rounded-3xl shadow-xl p-5 bg-white/20 backdrop-blur-xl border border-white/40 flex flex-col gap-5">
      <Image
        src="/icons/quote.svg"
        alt="Decorative divider"
        width={45}
        height={35}
        className=""
      />
      <p className="text-base leading-relaxed text-black/90 font-medium">
        Great experience with the diet program! It was easy to follow, fit well
        into my routine, and helped me see positive results quickly. The meals
        were satisfying, and the support throughout was amazing. Highly
        recommend!
      </p>
      <div className="flex flex-row gap-4 items-center">
        <Image
          src="/images/profileImg.png"
          alt="profile img"
          width={60}
          height={60}
          className="rounded-full"
        />
        <div>
          <p className="font-bold text">Omar Khaled</p>
          <p className="text-[#6B6B6B]">23 Years</p>
        </div>
      </div>
    </div>
  );
};

export default Review;
