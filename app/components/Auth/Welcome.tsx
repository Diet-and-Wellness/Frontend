"use client";

import Image from "next/image";

const Welcome = ({ msg }: { msg: string }) => {
  return (
    <div className="py-10 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <Image
        src="/icons/transform-track-thrive.svg"
        alt="Welcome illustration"
        width={445}
        height={145}
        className="w-55 sm:w-75 md:w-95 lg:w-111.25 h-auto"
        priority
      />

      <h4
        className="
          font-extrabold 
          text-[24px] sm:text-[28px] md:text-[32px] lg:text-[38px] 
          text-[#45802D] 
          text-center 
          mt-6 sm:mt-8 md:mt-10
          leading-snug
        "
      >
        {msg}
      </h4>
    </div>
  );
};

export default Welcome;
