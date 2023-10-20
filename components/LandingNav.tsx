import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import NavigationItems from "./NavigationItems";

const LandingNav = () => {
  return (
    <nav className="flex justify-between py-3 px-3">
      <h1 className="font-bold text-2xl">UR AI PAL</h1>
      {/* <Logo /> */}
      <div>
        <NavigationItems />
      </div>
      <div>
        <Link href={"/sign-in"}>
          <Button variant={"ghost"} className="">
           Dashboard
          </Button>
        </Link>
        <Link href={"/sign-up"}>
          <Button variant={"pre"} className="bg-purple-700  font-extrabold text-white  hover:bg-purple-800 transition">
            Free Trial
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default LandingNav;
{
}
