import Features from "../components/Home/Features";
import GetStarted from "../components/Home/GetStarted";
import Hero from "../components/Home/Hero";
import OurTools from "../components/Home/OurTools";
import RealStories from "../components/Home/RealStories";

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
