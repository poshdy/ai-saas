import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";

type Props = {};

const LandingNav = () => {
  return (
    <nav className="flex justify-between py-3 px-3">
      <h1 className="font-bold text-2xl">UR AI PAL</h1>
      {/* <Logo /> */}
      <div>
        <Link href={"/sign-in"}>
          <Button variant={"ghost"} className="">
            Sign in
          </Button>
        </Link>
        <Link href={"/sign-up"}>
          <Button className="rounded-full bg-purple-500 text-white ">Free Trial!</Button>
        </Link>
      </div>
    </nav>
  );
};

export default LandingNav;
