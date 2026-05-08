import Features from "@/app/components/Home/Features";
import GetStarted from "@/app/components/Home/GetStarted";
import Hero from "@/app/components/Home/Hero";
import OurTools from "@/app/components/Home/OurTools";
import RealStories from "@/app/components/Home/RealStories";

const landingHome = () => {
  return (
    <div>
      <Hero />
      <OurTools />
      <RealStories />
      <Features />
      <GetStarted />
    </div>
  );
};

export default landingHome;
