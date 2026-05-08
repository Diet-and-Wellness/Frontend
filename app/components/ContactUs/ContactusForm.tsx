"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

const ContactusForm = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleAutoGrow = () => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.12,
          },
        },
      }}
      className="w-full p-3 md:p-6 lg:p-10 flex flex-col gap-6"
    >
      {/* Title */}
      <motion.h3
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        className="font-extrabold text-3xl md:text-4xl lg:text-5xl"
      >
        Contact Us
      </motion.h3>

      {/* Description */}
      <motion.p
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        className="text-[#4F4F4F] text-[16px] mb-5 font-medium"
      >
        Please reach out to us and we will get back to you at the speed of
        light.
      </motion.p>

      {/* Input Field Wrapper */}
      {[
        { label: "Full Name", type: "text", placeholder: "Full Name" },
        { label: "Email", type: "email", placeholder: "you@company.com" },
        {
          label: "Phone number",
          type: "tel",
          placeholder: "+1 (555) 000-0000",
        },
      ].map((field, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          className="flex flex-col gap-2"
        >
          <label className="font-medium text-[16px]">
            {field.label} <span className="text-red-500">*</span>
          </label>
          <input
            type={field.type}
            placeholder={field.placeholder}
            className="outline-none border-2 border-[#D5D5D5] placeholder:text-[#A4A4A4] rounded-xl p-3 focus:border-[#3A6B26] transition"
          />
        </motion.div>
      ))}

      {/* Textarea */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        className="flex flex-col gap-2"
      >
        <label className="font-medium">Message</label>
        <textarea
          ref={textareaRef}
          placeholder="Leave us a message..."
          rows={4}
          onInput={handleAutoGrow}
          className="outline-none border-2 border-[#D5D5D5] placeholder:text-[#A4A4A4] rounded-xl p-3 resize-none overflow-hidden focus:border-[#3A6B26] transition"
        />
      </motion.div>

      {/* Button */}
      <motion.button
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="mt-4 bg-[#E99532] text-white text-[18px] rounded-4xl py-3 font-medium hover:opacity-90 transition cursor-pointer"
      >
        Send Message
      </motion.button>
    </motion.div>
  );
};

export default ContactusForm;
