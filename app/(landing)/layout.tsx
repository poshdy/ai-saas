import Image from "next/image";
import Mask from "@/public/Mask Group.png";
const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className={`h-full relative bg-[#070815] overflow-hidden`}>
      <Image fill src={Mask} alt="bg" />

      <div className="mx-auto max-w-screen-xl h-full w-full relative">
        {children}
      </div>
    </main>
  );
};

export default LandingLayout;
