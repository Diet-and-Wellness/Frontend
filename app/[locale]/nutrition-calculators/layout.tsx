import MinimalFooter from "../(landingPage)/_components/LandingFooter/MinimalFooter";
import MinimalHeader from "../(landingPage)/_components/LandingHeader/MinimalHeader";

const CalculatorsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <MinimalHeader />
      <div className="flex justify-center items-center mt-20 mb-15 p-5 md:mt-30">
        {children}
      </div>
      <MinimalFooter />
    </div>
  );
};

export default CalculatorsLayout;
