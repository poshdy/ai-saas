"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessagesSquare,
  Code2,
  Video,
  Settings,
  LucideMusic4,
  Image as image,
} from "lucide-react";

import Link from "next/link";

import { cn } from "@/lib/utils";
import Logo from "./Logo";

import FreeTier from "./FreeTier";

type Props = {
  LimitCount: number | undefined;
  isPro: boolean | undefined;
};
export const Tools = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    color: "text-green-700",
    bgColor: "text-green-700/10",
  },
  {
    name: "Conversation",
    href: "/conversation",
    icon: MessagesSquare,
    color: "text-pink-700",
    bgColor: "text-pink-700/10",
  },
  {
    name: "Image Generation",
    href: "/image",
    icon: image,
    color: "text-violet-700",
    bgColor: "text-violet-700/10",
  },
  {
    name: "Code Generation",
    href: "/code",
    icon: Code2,
    color: "text-purple-700",
    bgColor: "text-purple-700/10",
  },
  {
    name: "Music Generation",
    href: "/music",
    icon: LucideMusic4,
    color: "text-yellow-700",
    bgColor: "text-yellow-700/10",
  },
  {
    name: "Video Generation",
    href: "/video",
    icon: Video,
    color: "text-blue-700",
    bgColor: "text-blue-700/10",
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];
const Sidebar = ({ LimitCount, isPro = false }: Props) => {
  const pathname = usePathname();
  return (
    <aside className="space-y-4 py-4 flex flex-col h-full justify-between bg-[#121212] text-primary -z-10">
      <Logo />

      <div className="space-y-1 px-2 flex-1">
        {Tools.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-[#1f1f1f] hover:rounded-md  transition",
              pathname === route.href && "bg-[#1f1f1f]"
            )}
          >
            <div className="flex items-center flex-1">
              <route.icon className={cn(`h-5 w-5 mr-3 `, route.color)} />
              {route.name}
            </div>
          </Link>
        ))}
      </div>
      <FreeTier isPro={isPro} LimitCount={LimitCount} />
    </aside>
  );
};

export default Sidebar;
