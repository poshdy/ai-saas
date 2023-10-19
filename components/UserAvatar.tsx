import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { auth } from "@clerk/nextjs";
type Props = {};

const UserAvatar = (props: Props) => {
  // const { user } = auth();
  return (
    <>
    <p>U</p>
    </>
    // <Avatar className="h-8 w-8">
    //   <AvatarImage src={user?.imageUrl} />
    //   <AvatarFallback>{user?.firstName?.charAt(0)}</AvatarFallback>
    // </Avatar>
  );
};

export default UserAvatar;
