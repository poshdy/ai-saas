import Image from "next/image";
import React from "react";
import logo from "../public/Logo.png";
type Props = {};

const Logo = (props: Props) => {
  return (
    <div className="px-3 py-2 flex ">
      <div className="relative h-9 w-9 ">
        <Image alt="Logo" fill src={logo} />
      </div>
      <h1 className="font-bold text-2xl">
        UR <span className="text-destructive">AI</span> PAL
      </h1>
    </div>
  );
};

export default Logo;
