"use client";

import Image from "next/image";
import { usePathname } from "@/i18n/navigation";
import { formatDate } from "@/app/[locale]/utils/formateDate";
import Spinner from "@/app/[locale]/components/Public/LoadingSpinner";
import { useBlog } from "@/app/[locale]/hooks/useBlog";
import ViewIcon from "@/app/[locale]/components/icons/ViewIcon";

const BlogDetails = () => {
  const pathname = usePathname();
  const splittedPathname = pathname.split("/");
  const slug = splittedPathname[splittedPathname.length - 1];

  const { data: blog, isLoading } = useBlog(slug);

  console.log("blog details ===> ", blog);

  return (
    <section className="min-h-screen min-w-full">
      {blog && (
        <Image
          alt=""
          src={blog?.imageUrl}
          width={1000}
          height={1000}
          quality={100}
          className={`mt-20 lg:mt-25 bg-no-repeat w-[92.5%] md:w-[75%] max-h-170 bg-center object-cover bg-green-500 min-h-80 md:min-h-120 lg:min-h-140 max-w-[92.5%] mx-auto rounded-4xl`}
        />
      )}

      {isLoading ? (
        <div className="place-self-center my-25">
          <Spinner spinnerSize={60} borderColor="#4D8E32" />
        </div>
      ) : (
        <div className="flex flex-col gap-7.5 w-[90%] md:max-w-[70%] mx-auto py-7.5 lg:py-10">
          <div className="flex justify-between items-center">
            <div className="flex flex-row gap-5 items-center">
              <p className="text-[#3E7228] text-[20px] md:text-[22px] lg:text-[24px] font-medium">
                {formatDate(blog.createdAt)}
              </p>

              <div className="bg-[#E99532] rounded-lg py-1 px-2 flex flex-row justify-center items-center gap-1">
                <Image
                  width={20}
                  height={20}
                  src="/icons/eye.svg"
                  alt="Eye icon"
                  className="h-4 w-4 lg:h-5 lg:w-5"
                />

                <p className="text-white font-medium text-[14px] md:text-[15px] lg:text-[16px] leading-3">
                  {`${blog.estimatedReadTime} min Read`}
                </p>
              </div>
            </div>
            <div className="flex gap-1.5 items-center">
              <p className="text-[20px] font-medium text-[#4F4F4F]">
                Viewed by {blog.viewCount}
              </p>
              <ViewIcon />
            </div>
          </div>

          <h5 className="text-[24px] md:text-[32px] font-semibold leading-9">
            {blog.title}
          </h5>

          <p className="text-[#4F4F4F] max-w-6xl text-[18px] md:text-[20px] lg:text-[22px] font-medium">
            {blog.description}
          </p>

          <p className="text-[#4F4F4F] max-w-6xl text-[16px] md:text-[18px] lg:text-[20px] whitespace-pre-wrap">
            {blog.content}
          </p>
        </div>
      )}
    </section>
  );
};

export default BlogDetails;
