import { UserButton } from "@clerk/nextjs";
import React from "react";
import Mobsidebar from "./mob-side-bar";
import { getApiCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

type Props = {};

const Navbar = async (props: Props) => {
  const LimitCount = await getApiCount();
  const isPro = await checkSubscription();
  return (
    <nav className="flex items-center justify-between p-4">
      <Mobsidebar isPro={isPro} LimitCount={LimitCount} />
      <div>
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
};

export default Navbar;
