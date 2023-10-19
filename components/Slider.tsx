import { Sparkle } from "lucide-react";
import React from "react";
import Marquee from "react-fast-marquee";
type Props = {};
const Services = [
  "Conversation",
  "Code Generation",
  "Image Generation",
  "Video Generation",
  "Music Generation",
];
const Slider = (props: Props) => {
  return (
    <Marquee
      className="overflow-y-hidden"
      speed={40}
      gradient
      gradientColor="#06071A"
      autoFill
    >
      {Services.map((service, i) => (
        <div key={i} className="flex items-center gap-3">
          <p className="text-4xl font-black">{service}</p>
          <Sparkle className="w-10 h-10 mr-2 fill-white" />
        </div>
      ))}
    </Marquee>
  );
};

export default Slider;
