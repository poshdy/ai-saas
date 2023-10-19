"use client";
import Image from "next/image";
import React, { useState } from "react";
import Product from "@/public/Product.png";
import { Button } from "./ui/button";
type Props = {};

const Hero = (props: Props) => {
  const Services = ["Developers", "Designers", "Writers", "Creatives"];
  const [text, setText] = useState<string[]>(Services);

  const handleChange = () => {
    setInterval(() => {
      //   setText((prev) => prev++);
    }, 1000);
  };
  return (
    <section className="my-28">
      <div className="my-28 space-y-5 text-center text-primary">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-snug tracking-tight">
          The Next Generation of AI Tools For{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-600">
            Developers
          </span>
        </h1>
        <p className="text-sm text-primary">
          Unlock the potential of AI for your business with UR AI PAL and
          revolutionize your operations.
        </p>
        <Button className="" variant={"ghost"}>
          Join us now
        </Button>
        <Button
          className="bg-purple-700 rounded-full text-white font-bold"
          variant={"pre"}
        >
          Free Trail
        </Button>
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
