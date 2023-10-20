"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import {
  Code,
  Code2,
  ImageIcon,
  LucideMusic2,
  MessagesSquare,
  Video,
} from "lucide-react";

import Link from "next/link";

const NavigationItems = () => {
  const Tools = [
    {
      name: "Conversation",
      desc: "Fuel conversations with UR AI PAL. Chat like never before. Great for chatbots and customer support. Elevate interactions!",
      icon: MessagesSquare,
      color: "text-pink-700",
      bgColor: "bg-pink-700/10",
    },
    {
      name: "Image Generation",
      desc: "Elevate visuals with UR AI PAL. Create images with ease. Perfect for artists and designers. Unleash your imagination!",
      icon: ImageIcon,
      color: "text-violet-700",
      bgColor: "bg-violet-700/10",
    },
    {
      name: "Code Generation",
      desc: "Supercharge coding with UR AI PAL. Generate code effortlessly. A must for developers and software wizards. Revolutionize coding!",
      icon: Code2,
      color: "text-purple-700",
      bgColor: "bg-purple-700/10",
    },
    {
      name: "Music Generation",
      icon: LucideMusic2,
      desc: "Amplify music with UR AI PAL. Compose melodies effortlessly. For musicians and songwriters. Let creativity flow!",
      color: "text-yellow-700",
      bgColor: "bg-yellow-700/10",
    },
    {
      name: "Video Generation",
      icon: Video,
      desc: "Enhance videos with UR AI PAL. Generate concepts and animations. Ideal for filmmakers and creators. Innovate with us!",
      color: "text-blue-700",
      bgColor: "bg-blue-700/10",
    },
  ];
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">
            <Link href={"/"}> Home</Link>
          </NavigationMenuTrigger>
        </NavigationMenuItem>
        <NavigationMenuItem className="border-0">
          <NavigationMenuTrigger className="bg-transparent">
            Products
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-black border-0">
            <ul className="grid w-[400px] gap-3 p-5 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {Tools.map((tool) => (
                <div
                  className="space-y-2 p-3 rounded-md hover:bg-white/10 "
                  key={tool.name}
                >
                  <h4 className="font-bold text-lg">{tool.name}</h4>
                  <p className="text-xs text-primary">{tool.desc}</p>
                </div>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavigationItems;
