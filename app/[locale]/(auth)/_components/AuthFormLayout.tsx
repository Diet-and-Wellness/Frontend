import { GrainGradient } from "@paper-design/shaders-react";
import { motion } from "framer-motion";
import Welcome from "./Welcome";
import { useTranslations } from "next-intl";
import { visualColors } from "@/app/[locale]/styles/colors";

type AuthFormLayoutProps = { children: React.ReactNode };

export default function AuthFormLayout({ children }: AuthFormLayoutProps) {
  const t = useTranslations("auth");
  return (
    <section className="min-h-screen py-25 flex items-start">
      <div className="w-[90%] mx-auto flex flex-col lg:flex-row items-center gap-5 lg:gap-15">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: "easeInOut" }} viewport={{ once: true }} className="self-stretch w-full lg:min-h-screen rounded-3xl overflow-hidden">
          <GrainGradient width="100%" height="100%" colors={[visualColors.gradientOrange, visualColors.gradientPeach]} colorBack={visualColors.gradientGreen} softness={0.7} intensity={0.6} noise={0.25} speed={5} className="flex lg:min-h-screen justify-center items-center">
            <Welcome msg={t("welcome")} />
          </GrainGradient>
        </motion.div>
        {children}
      </div>
    </section>
  );
}
