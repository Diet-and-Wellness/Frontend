import { GrainGradient } from "@paper-design/shaders-react";
import { motion } from "framer-motion";
import ContactusForm from "./ContactusForm";
import Review from "./Review";
import { visualColors } from "@/app/[locale]/styles/colors";

export default function ContactUsLayout() {
  return (
    <section className="flex min-h-screen items-start py-20 sm:py-25">
      <div className="mx-auto flex w-[90%] flex-col items-center gap-5 lg:flex-row lg:gap-15">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="min-h-105 w-full self-stretch overflow-hidden rounded-3xl sm:min-h-120 lg:min-h-screen"
        >
          <GrainGradient
            width="100%"
            height="100%"
            colors={[visualColors.gradientOrange, visualColors.gradientPeach]}
            colorBack={visualColors.gradientGreen}
            softness={0.7}
            intensity={0.6}
            noise={0.25}
            speed={5}
            className="flex min-h-105 items-center justify-center sm:min-h-120 lg:min-h-screen"
          >
            <Review />
          </GrainGradient>
        </motion.div>
        <ContactusForm />
      </div>
    </section>
  );
}
