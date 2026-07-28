import Features from "./_components/home/Features";
import GetStarted from "./_components/home/GetStarted";
import Hero from "./_components/home/Hero";
import OurTools from "./_components/home/OurTools";
import RealStories from "./_components/home/RealStories";

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
