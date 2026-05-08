"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const AboutUsPage = () => {
  return (
    <section className="min-h-screen pt-25 lg:pt-30 pb-15">
      <div className="max-w-[90%] mx-auto flex flex-col gap-3 lg:gap-10">
        {/* HERO */}
        <div className="relative min-h-80 lg:min-h-180 rounded-[20px] lg:rounded-[40px] overflow-hidden flex flex-col gap-2 justify-center items-center p-10 text-center">
          {/* Animated Background */}
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src="/images/aboutImg.png"
              alt="About background"
              fill
              priority
              className="object-cover object-center"
            />
          </motion.div>

          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 bg-linear-to-t from-black/40 via-black/20 to-transparent"
          />

          <div className="flex flex-col gap-4 lg:gap-20">
            {/* Content */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: "easeInOut" }}
              className="relative z-10 text-xl sm:text-2xl lg:text-5xl text-white text-center"
            >
              Enjoyable Living
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7, ease: "easeInOut" }}
              className="relative z-10 text-2xl sm:text-3xl lg:text-6xl leading-10 font-bold text-white text-center"
            >
              Starts With Balanced Nutrition
            </motion.p>
          </div>
        </div>

        {/* CONTENT */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="flex flex-col items-start gap-3 lg:gap-5 p-6 lg:p-12 max-w-5xl"
        >
          <motion.p
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="text-xl lg:text-3xl font-bold min-w-50"
          >
            What you should know about Diet & Wellness
          </motion.p>

          {/* Paragraph 1 */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="text-[16px] lg:text-xl"
          >
            At Diet & Wellness, we believe that nutrition is not just a diet for weights
            loss, but a lifestyle that helps people live with better health and
            more energy. Our idea started from the belief that every person is
            unique, and therefore there is no single diet that fits everyone. We
            focus on fully understanding each client’s situation by learning
            about their lifestyle, eating habits, and medical history, then
            creating a personalized nutrition plan that matches their needs and
            goals.
          </motion.p>

          {/* List */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex flex-col gap-3 mt-3"
          >
            <h4 className="text-[18px] lg:text-xl font-semibold">
              We help our clients to:
            </h4>
            <ul className="text-[16px] lg:text-xl flex flex-col gap-0.5 lg:gap-1">
              <li>Lose or gain weight in a healthy way</li>
              <li>Improve daily eating habits</li>
              <li>Support digestive health</li>
              <li>Manage certain nutrition-related health conditions</li>
              <li>Build a sustainable, healthy lifestyle</li>
            </ul>
          </motion.div>

          {/* Paragraph 2 */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-[16px] lg:text-xl font-light"
          >
            At Diet & Wellness, we don’t believe in quick fixes or strict diets. Instead,
            we focus on gradual, lasting changes that help individuals reach
            their goals and maintain them.
          </motion.p>

          {/* Paragraph 3 */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-[16px] lg:text-xl font-semibold"
          >
            Our goal is simple, to be a partner in our clients’ journey toward a
            healthier, more balanced life.
          </motion.p>

          {/* Button */}
          <motion.button
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            whileTap={{ scale: 0.98 }}
            whileHover={{ background: "#3a6b26" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full sm:w-80 mt-10 py-3 text-[14px] lg:text-[18px] rounded-4xl text-white font-medium bg-[#3a6b26e0] cursor-pointer"
          >
            Get Started Now
          </motion.button>
        </motion.div>
        {/* <div >
        </div> */}
      </div>
    </section>
  );
};

export default AboutUsPage;
