"use client";

import { motion } from "framer-motion";

type AboutVideoSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  videoTitle: string;
  videoUrl?: string;
};

const AboutVideoSection = ({
  eyebrow,
  title,
  description,
  videoTitle,
  videoUrl = "https://www.facebook.com/reel/1324108165236626",
}: AboutVideoSectionProps) => {
  const embedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
    videoUrl,
  )}&show_text=false&width=1280`;

  return (
    <section className="mx-auto w-[90%] max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="mb-7 flex max-w-3xl flex-col gap-3 sm:mb-10"
      >
        <p className="type-label font-bold uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </p>

        <h1 className="type-display font-extrabold tracking-tight text-brand-ink">
          {title}
        </h1>

        <p className="type-body-lg max-w-2xl text-content-muted">
          {description}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.7,
          delay: 0.12,
          ease: "easeOut",
        }}
        className="
          relative
          flex
          min-h-125
          items-center
          justify-center
          overflow-hidden
          rounded-3xl
          border
          border-line
          bg-black
          shadow-[0_24px_70px_rgba(35,64,22,0.18)]
          sm:min-h-162.5
          sm:rounded-[36px]
        "
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden bg-black">
          <motion.div
            animate={{
              scale: [1.05, 1.22, 1.12, 1.18, 1.05],
              x: ["-4%", "3%", "-2%", "4%", "-4%"],
              y: ["-3%", "3%", "5%", "-2%", "-3%"],
              rotate: [0, 2, -2, 1, 0],
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              inset-[-20%]
              blur-3xl
              saturate-150
            "
          >
            <div
              className="
                absolute
                left-[5%]
                top-[10%]
                h-[60%]
                w-[55%]
                rounded-full
                bg-orange-500/50
                blur-[100px]
              "
            />

            <div
              className="
                absolute
                right-[5%]
                top-[5%]
                h-[65%]
                w-[50%]
                rounded-full
                bg-emerald-900/60
                blur-[110px]
              "
            />

            <div
              className="
                absolute
                bottom-[-5%]
                left-[30%]
                h-[55%]
                w-[45%]
                rounded-full
                bg-amber-300/40
                blur-[100px]
              "
            />

            <div
              className="
                absolute
                bottom-[5%]
                right-[10%]
                h-[45%]
                w-[40%]
                rounded-full
                bg-red-950/50
                blur-[110px]
              "
            />
          </motion.div>

          <div className="absolute inset-0 bg-black/20" />

          <div
            className="
              absolute
              inset-0
              bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.5)_100%)]
            "
          />

          <div
            className="
              absolute
              inset-x-[25%]
              top-[10%]
              h-[80%]
              rounded-full
              bg-white/5
              blur-3xl
            "
          />
        </div>

        <iframe
          className="
            relative
            z-10
            aspect-9/16
            h-120
            w-auto
            max-w-full
            rounded-3xl
            border-0
            bg-black
            shadow-[0_30px_80px_rgba(0,0,0,0.45)]
            sm:h-155
            sm:rounded-[30px]
          "
          src={embedUrl}
          title={videoTitle}
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />

        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            top-0
            z-20
            h-px
            bg-white/20
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-20
            rounded-3xl
            ring-1
            ring-inset
            ring-white/10
            sm:rounded-[36px]
          "
        />
      </motion.div>
    </section>
  );
};

export default AboutVideoSection;
