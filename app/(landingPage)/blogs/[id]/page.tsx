import Image from "next/image";

const BlogDetails = () => {
  return (
    <section className="min-h-screen min-w-full">
      <div className="mt-20 md:mt-30 overflow-hidden bg-[url('/images/blog-img.webp')] bg-no-repeat bg-center bg-cover bg-green-500 min-h-80 md:min-h-120 lg:min-h-140 max-w-[92.5%] mx-auto rounded-4xl" />
      <div className="flex flex-col gap-7.5 max-w-[90%] mx-auto p-10 lg:p-15">
        <div className="flex flex-row gap-5 items-center">
          <p className="text-[#3E7228] text-[20px] md:text-[22px] lg:text-[24px] font-medium">
            5 Apr, 2027
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
              7 min Read
            </p>
          </div>
        </div>

        <h5 className="text-[28px] md:text-[32px] lg:text-[38px] font-semibold leading-9">
          Starts With Balanced Nutrition
        </h5>

        <p className="text-[#4F4F4F] max-w-6xl text-[16px] md:text-[18px] lg:text-[20px]">
          At WAZNY, we believe that nutrition is not just a diet for weight
          loss, but a lifestyle that helps people live with better health and
          more energy. Our idea started from the belief that{" "}
        </p>

        <p className="text-[#4F4F4F] max-w-6xl text-[16px] md:text-[18px] lg:text-[20px]">
          At WAZNY, we believe that nutrition is not just a diet for weight
          loss, but a lifestyle that helps people live with better health and
          more energy. Our idea started from the belief that{" "}
        </p>

        <p className="text-[#4F4F4F] max-w-6xl text-[16px] md:text-[18px] lg:text-[20px]">
          At WAZNY, we believe that nutrition is not just a diet for weight
          loss, but a lifestyle that helps people live with better health and
          more energy. Our idea started from the belief that{" "}
        </p>

        <p className="text-[#4F4F4F] max-w-6xl text-[16px] md:text-[18px] lg:text-[20px]">
          At WAZNY, we believe that nutrition is not just a diet for weight
          loss, but a lifestyle that helps people live with better health and
          more energy. Our idea started from the belief that{" "}
        </p>
      </div>
    </section>
  );
};

export default BlogDetails;
