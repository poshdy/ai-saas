import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  desc?: string;
  color?: string;
  bgColor?: string;
  Icon: LucideIcon;
};

const Heading = ({ Icon, color, bgColor, desc, title }: Props) => {
  return (
    <section className="flex px-4 md:px-5 mb-5 items-center gap-2">
      <div
        className={cn(
          "p-2 flex items-center justify-center rounded-sm",
          bgColor
        )}
      >
        <Icon className={cn("w-9 h-9", color)} />
      </div>
      <div>
        <h2 className="text-xl md:text-2xl text-primary font-bold">{title}</h2>
        <p className="text-sm font-light text-primary">{desc}</p>
      </div>
    </section>
  );
};

export default Heading;
