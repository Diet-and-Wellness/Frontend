import MinimalFooter from "../(landingPage)/_components/LandingFooter/MinimalFooter";
import MinimalHeader from "../(landingPage)/_components/LandingHeader/MinimalHeader";

const CalculatorsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <MinimalHeader />
      <div className="flex w-full justify-center mt-25 mb-15 px-5 md:mt-30 md:px-8">
        {children}
      </div>
      <MinimalFooter />
    </div>
  );
};

export default CalculatorsLayout;
