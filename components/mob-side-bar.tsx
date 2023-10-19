"use client";
import React, { useState, useEffect } from "react";

import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet";
import { MenuIcon } from "lucide-react";
import Sidebar from "./sidebar";
type Props = {
  LimitCount: number | undefined;
  isPro: boolean | undefined;
};

const Mobsidebar = ({ LimitCount , isPro =false }: Props) => {
  const [Mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!Mounted) {
    return null;
  }
  return (
    <nav>
      <Sheet>
        <SheetTrigger>
          <div className="md:hidden flex">
            <MenuIcon />
          </div>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <Sidebar isPro={isPro} LimitCount={LimitCount} />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Mobsidebar;
