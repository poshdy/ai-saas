import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

type Props = {};

const BotAvatar = (props: Props) => {
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage src={"/Logo.png"} />
    </Avatar>
  );
};

export default BotAvatar;
