import Image from "next/image";

const Subscribe = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className="flex w-full flex-col gap-4 sm:gap-5 lg:max-w-[30%]">
      
      {/* Title */}
      <h3 className="text-base sm:text-lg md:text-xl font-medium text-white">
        Stay Connected
      </h3>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="
          flex items-center gap-2 sm:gap-3
          rounded-xl border border-white/40
          bg-white/20 px-3 sm:px-4 py-2.5 sm:py-3
          backdrop-blur-md
          transition-all duration-300
          focus-within:border-white/70 focus-within:bg-white/30
        "
      >
        <input
          type="email"
          placeholder="Enter your email"
          aria-label="Email address"
          required
          className="
            w-full bg-transparent
            text-sm sm:text-base md:text-lg
            font-light text-white
            placeholder:text-white/70
            outline-none
          "
        />

        <button
          type="submit"
          aria-label="Subscribe"
          className="shrink-0 transition-transform duration-200 hover:scale-100 active:scale-97"
        >
          <Image
            src="/icons/mail.svg"
            alt=""
            width={22}
            height={22}
            className="sm:w-6 md:w-6.5"
          />
        </button>
      </form>

      {/* Description */}
      <p
        className="
          text-sm sm:text-base md:text-[18px]
          leading-6 sm:leading-7
          font-extralight text-white/90
          max-w-md
        "
      >
        Subscribe to our newsletter and unlock a world of exclusive benefits. Be
        the first to know about our latest nutrition tips and recipes, special
        promotions, and exciting updates.
      </p>
    </section>
  );
};

export default Subscribe;