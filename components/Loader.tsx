import React from "react";
import Image from "next/image";
import Logo from "@/public/Logo.png";


function Loader() {
  return (
    <div className="w-full flex flex-col justify-center items-center ">
      <div className="relative w-10 aspect-square animate-spin">
        <Image src={Logo} alt="logo" />
      </div>
      <p>UR PAL IS THINKING!...</p>
    </div>
  );
}

export default Loader;
