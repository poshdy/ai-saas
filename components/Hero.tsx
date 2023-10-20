import Image from "next/image";
import Product from "@/public/Product.png";
import { Button } from "./ui/button";
import Link from "next/link";
import { auth } from "@clerk/nextjs";
type Props = {};

const Hero = (props: Props) => {
  const { userId } = auth();
  return (
    <section className="my-28">
      <div className="my-28 space-y-5 text-center text-primary">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-snug tracking-tight">
          Experience the Future <br /> AI-Powered Solutions for Your Success
        </h1>
        <p className="text-sm font-semibold text-primary/80">
          Sign up now for 5 free AI generations and supercharge your creativity!
        </p>
        <div>
          <Link href={userId ? "/dashboard" : "/sign-in"}>
            <Button variant={"ghost"} className="">
              Dashboard
            </Button>
          </Link>
          <Link href={"/sign-up"}>
            <Button
              variant={"pre"}
              className="bg-purple-700  font-extrabold text-white  hover:bg-purple-800 transition"
            >
              Free Trial
            </Button>
          </Link>
        </div>
      </div>
      <section className="relative w-full flex justify-center  ">
        <div className="relative w-[95%] aspect-video z-20 shadow-xl opacity-95">
          <Image
            className="overflow-clip rounded-xl  "
            fill
            src={Product}
            alt="product"
          />
        </div>

        <div className="w-full absolute top-0 blur-3xl opacity-30  bg-[#ED20FF] h-full"></div>
      </section>
    </section>
  );
};

export default Hero;
