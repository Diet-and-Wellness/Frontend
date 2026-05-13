"use client";

import { motion } from "framer-motion";
import { GrainGradient } from "@paper-design/shaders-react";
import Review from "../ContactUs/Review";
import Welcome from "./Welcome";
import SigninForm from "./SigninForm";
import SignupForm from "./SiginupForm";
import ContactusForm from "../ContactUs/ContactusForm";

const Form = ({ type }: { type: string }) => {
  return (
    <section className="min-h-screen py-25 flex items-start">
      <div className="w-[90%] mx-auto flex flex-col lg:flex-row items-center gap-5 lg:gap-15">
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="self-stretch w-full lg:min-h-screen rounded-3xl overflow-hidden"
        >
          <GrainGradient
            width="100%"
            height="100%"
            colors={["#f7a969", "#ffbc85"]}
            colorBack="#98E694"
            softness={0.7}
            intensity={0.6}
            noise={0.25}
            speed={5}
            className="flex lg:min-h-screen justify-center items-center p-6"
          >
            {type === "contactus" && <Review />}
            {(type === "signin" || type === "signup") && (
              <Welcome msg="Welcome to Diet & Wellness" />
            )}
          </GrainGradient>
        </motion.div>

        {/* RIGHT SIDE */}
        {type === "signin" && <SigninForm />}
        {type === "signup" && <SignupForm />}
        {type === "contactus" && <ContactusForm />}
      </div>
    </section>
  );
};

export default Form;
