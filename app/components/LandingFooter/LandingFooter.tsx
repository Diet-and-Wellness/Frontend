"use client";

import QuickLinks from "./footerComp/QuickLinks";
import Socials from "./footerComp/Socials";
import Subscribe from "./footerComp/Subscribe";

const quicklinks = [
  { href: "/", title: "Home" },
  { href: "/about-us", title: "About Us" },
  { href: "/blogs", title: "Blogs" },
  { href: "/contact-us", title: "Contact Us" },
  { href: "/pricing", title: "Pricing" },
];

const tools = [
  { href: "/", title: "Body Mass Index (BMI) Calculator" },
  { href: "/", title: "Perfect Weight Calculator" },
  { href: "/", title: "Calorie Calculate" },
  { href: "/", title: "Nutrition Analysis" },
];

const LandingFooter = () => {
  return (
    <footer className="w-full bg-[#2D5A3D] py-12">
      <div className="mx-auto w-[90%] flex flex-col gap-12">
        {/* Layout */}
        <div className="flex flex-row justify-between gap-10 flex-wrap">
          <Socials />
          <QuickLinks title="Quick Links" linksList={quicklinks} />
          <QuickLinks title="Tools" linksList={tools} />
          <Subscribe />
        </div>

        {/* Footer bottom */}
        <p className="text-center text-white/80 text-sm md:text-lg font-extralight">
          © 2026 Diet & Wellness All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default LandingFooter;
