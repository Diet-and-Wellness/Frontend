"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const Blog = ({ type }: { type: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true, amount: 0.25 }}
      className={`${type === "full" ? "w-full flex-col md:flex-row" : "w-full md:max-w-110 flex-col"} rounded-4xl border border-[#EDEDED] overflow-hidden flex hover:shadow-lg transition-shadow duration-100`}
    >
      <div
        className={`${type === "full" ? "min-h-40" : "w-auto"} overflow-hidden`}
      >
        <Image
          width={1000}
          height={10}
          src="/images/blog-img.webp"
          alt="blog image"
          className={`${type === "full" ? "min-w-full h-full" : "w-full h-full"} object-cover object-center hover:scale-107 transition-transform duration-300`}
        />
      </div>

      <div className="p-5 lg:p-7.5 flex flex-col items-start gap-3">
        <div className="flex flex-row gap-5 items-center">
          <p className="text-[#3E7228] text-[16px] md:text-[18px] lg:text-[20px] font-medium">
            5 Apr, 2027
          </p>
          <div className="bg-[#E99532] rounded-lg py-1 px-2 flex flex-row justify-center items-center gap-1">
            <Image
              width={16}
              height={16}
              src="/icons/eye.svg"
              alt="Eye icon"
              className="h-3 w-3 lg:h-4 lg:w-4"
            />
            <p className="text-white font-medium text-[11px] md:text-[12px] lg:text-[13px] leading-3">
              7 min Read
            </p>
          </div>
        </div>

        <h5 className="text-[24px] md:text-[28px] lg:text-[32px] font-semibold">
          Blog Title
        </h5>

        <p className="text-[#4F4F4F] max-w-6xl text-[16px] md:text-[18px] lg:text-[20px]">
          At WAZNY, we believe that nutrition is not just a diet for weight
          loss, but a lifestyle that helps people live with better health and
          more energy. Our idea started from the belief that{" "}
        </p>

        <Link
          href={"/blogs/re58v4dk7I"}
          className="group hover:bg-[#2E551E] transition-colors duration-400 mt-3 py-2 px-8 lg:px-10 rounded-4xl border-2 border-[#2E551E]"
        >
          <span className="text-[#2E551E] font-bold text-center text-[16px] md:text-[18px] lg:text-[20px] group-hover:text-white transition-colors duration-400">
            Read More
          </span>
        </Link>
      </div>
    </motion.div>
  );
};

export default Blog;
