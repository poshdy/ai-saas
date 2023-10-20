import React from "react";
import { Card } from "@/components/ui/card";
import {
  MessagesSquare,
  Code2,
  Video,
  ArrowRight,
  LucideMusic4,
  Image as image,
} from "lucide-react";

import { cn } from "@/lib/utils";

import Link from "next/link";

const Dashboard = () => {
  const Tools = [
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
  ];
  return (
    <section className="px-4 md:px-6">
      <div className="space-y-4 mb-5 flex flex-col items-center ">
        <h1 className="text-3xl leading-tight tracking-tight text-white font-extrabold  ">
          Empowering Your Enterprise with AI Excellence Unveiling UR AI PAL
        </h1>
        <p className="text-sm text-primary font-light">
          Unlock the potential of AI for your business with UR AI PAL and
          revolutionize your operations.
        </p>
      </div>
      <div className="space-y-6 ">
        {Tools.map((tool) => (
          <Card
            className="bg-[#121212] p-4  border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer "
            key={tool.href}
          >
            <Link className="flex justify-between w-full items-center" href={tool.href}>
              <div className="flex items-center gap-x-4">
                <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                  <tool.icon className={cn("w-8 h-8", tool.color)} />
                </div>
                <h4 className="font-semibold text-primary">{tool.name}</h4>
              </div>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Dashboard;
