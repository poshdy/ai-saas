import { cn } from "@/lib/utils";

import image from "next/image";

import React from "react";
import { Card } from "./ui/card";
import {
  ArrowRight,
  Code2,
  ImageIcon,
  LucideMusic4,
  MessagesSquare,
  Video,
} from "lucide-react";

type Props = {};

const Content = (props: Props) => {
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
      icon: LucideMusic4,
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
    <div className="my-20 flex flex-wrap  gap-2 justify-center">
      {Tools.map((tool) => (
        <Card
          className="bg-[#121212] max-w-xl  p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer "
          key={tool.name}
        >
          <div className="flex items-center gap-x-4">
            <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
              <tool.icon className={cn("w-8 h-8", tool.color)} />
            </div>
            <div className="flex-col flex gap-1 text-primary">
              <h4 className="font-semibold ">{tool.name}</h4>
              <p className="font-light  text-sm">{tool.desc}</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5" />
        </Card>
      ))}
    </div>
  );
};

export default Content;
