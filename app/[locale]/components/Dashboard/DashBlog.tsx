"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import DateIcon from "../icons/Date";
import PenIcon from "../icons/Pen";
import TrashIcon from "../icons/TrashIcon";

const DashBlog = () => {
  const t = useTranslations();

  return (
    <div className="flex max-w-100 h-fit flex-col overflow-hidden rounded-4xl border border-[#EDEDED] transition-shadow duration-200 hover:shadow-lg bg-[#FFFEFD]">
      <div className="overflow-hidden">
        <Image
          width={400}
          height={60}
          src="/images/blog-img.webp"
          alt="blog image"
          className="h-full w-100 object-cover object-center transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="flex flex-col items-start gap-2.5 p-5">
        {/* <div className="flex items-center gap-5">
          <p className="text-[16px] font-medium text-[#3E7228] md:text-[18px] lg:text-[20px]">
            {t("blogs.date")}
          </p>

          <div className="flex items-center justify-center gap-1 rounded-lg bg-[#E99532] px-2 py-1">
            <Image
              width={16}
              height={16}
              src="/icons/eye.svg"
              alt="Eye icon"
              className="h-3 w-3 lg:h-4 lg:w-4"
            />

            <p className="text-[11px] font-medium leading-3 text-white md:text-[12px] lg:text-[13px]">
              {t("blogs.readTime")}
            </p>
          </div>
        </div> */}

        <h5 className="text-[16px] font-semibold md:text-[18px] lg:text-[20px]">
          {t("blogs.blogTitle")}
        </h5>

        <p className="text-[12px] text-[#4F4F4F] md:text-[14px] lg:text-[16px]">
          {t("blogs.waznyAbout")}
        </p>
      </div>

      <div className="flex justify-between items-center px-5 py-3 border-t border-t-[#E1E7EF]">
        <div className="flex gap-3 items-center">
          <DateIcon className="text-[#4F4F4F]" />
          <p className="text-[#4F4F4F] text-[15px]">Oct 24, 2026</p>
        </div>
        <div className="flex gap-1 items-center">
          <button className="size-10 rounded-full flex justify-center items-center hover:bg-gray-200 cursor-pointer">
            <PenIcon className="text-[#4F4F4F]" />
          </button>
          <button className="size-10 rounded-full flex justify-center items-center hover:bg-red-100 cursor-pointer">
            <TrashIcon className="text-[#DC2626]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashBlog;
